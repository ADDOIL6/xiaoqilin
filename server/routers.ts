import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";
import * as db from "./db";
import * as contentful from "./contentful";
import { mockListings } from "./contentful-mock";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  listings: router({
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1).max(200),
          description: z.string().optional(),
          propertyType: z.enum(["studio", "1b1b", "2b2b", "3b3b", "4b4b", "other"]),
          city: z.string().min(1).max(100),
          country: z.string().min(1).max(100),
          address: z.string().min(1),
          postcode: z.string().max(20).optional(),
          latitude: z.number().optional(),
          longitude: z.number().optional(),
          price: z.number().positive(),
          currency: z.string().default("GBP"),
          availableFrom: z.date(),
          availableTo: z.date().optional(),
          minRentalPeriod: z.number().optional(),
          furnished: z.boolean().default(false),
          billsIncluded: z.boolean().default(false),
          images: z.array(z.object({
            url: z.string(),
            key: z.string(),
            order: z.number(),
          })).optional(),
          // New fields for enhanced features
          videoUrl: z.string().optional(),
          videoKey: z.string().optional(),
          hasVideo: z.boolean().default(false),
          isVip: z.boolean().default(false),
          isVerified: z.boolean().default(false),
          isStudentCertified: z.boolean().default(false),
          apartmentType: z.string().max(50).optional(),
          amenities: z.array(z.string()).optional(),
          listingNumber: z.string().max(20).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { images, amenities, ...listingData } = input;
        const listingId = await db.createListing({
          ...listingData,
          price: listingData.price.toString(),
          latitude: listingData.latitude?.toString(),
          longitude: listingData.longitude?.toString(),
          amenities: amenities ? JSON.stringify(amenities) : null,
          publishedAt: new Date(),
          userId: ctx.user.id,
          status: "active",
        });

        if (images && images.length > 0) {
          await db.addListingImages(
            images.map(img => ({
              listingId: Number(listingId),
              imageUrl: img.url,
              imageKey: img.key,
              displayOrder: img.order,
            }))
          );
        }

        return { id: listingId };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(1).max(200).optional(),
          description: z.string().optional(),
          propertyType: z.enum(["studio", "1b1b", "2b2b", "3b3b", "4b4b", "other"]).optional(),
          city: z.string().min(1).max(100).optional(),
          country: z.string().min(1).max(100).optional(),
          address: z.string().min(1).optional(),
          postcode: z.string().max(20).optional(),
          latitude: z.number().optional(),
          longitude: z.number().optional(),
          price: z.number().positive().optional(),
          currency: z.string().optional(),
          availableFrom: z.date().optional(),
          availableTo: z.date().optional(),
          minRentalPeriod: z.number().optional(),
          furnished: z.boolean().optional(),
          billsIncluded: z.boolean().optional(),
          status: z.enum(["active", "rented", "inactive"]).optional(),
          images: z.array(z.object({
            url: z.string(),
            key: z.string(),
            order: z.number(),
          })).optional(),
          // New fields for enhanced features
          videoUrl: z.string().optional(),
          videoKey: z.string().optional(),
          hasVideo: z.boolean().optional(),
          isVip: z.boolean().optional(),
          isVerified: z.boolean().optional(),
          isStudentCertified: z.boolean().optional(),
          apartmentType: z.string().max(50).optional(),
          amenities: z.array(z.string()).optional(),
          listingNumber: z.string().max(20).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, images, amenities, ...updateData } = input;
        
        const listing = await db.getListingById(id);
        if (!listing || listing.userId !== ctx.user.id) {
          throw new Error("Listing not found or unauthorized");
        }

        const finalUpdateData: any = { ...updateData };
        if (updateData.price !== undefined) {
          finalUpdateData.price = updateData.price.toString();
        }
        if (updateData.latitude !== undefined) {
          finalUpdateData.latitude = updateData.latitude.toString();
        }
        if (updateData.longitude !== undefined) {
          finalUpdateData.longitude = updateData.longitude.toString();
        }
        if (amenities !== undefined) {
          finalUpdateData.amenities = amenities ? JSON.stringify(amenities) : null;
        }
        await db.updateListing(id, finalUpdateData);

        if (images) {
          await db.deleteListingImages(id);
          if (images.length > 0) {
            await db.addListingImages(
              images.map(img => ({
                listingId: id,
                imageUrl: img.url,
                imageKey: img.key,
                displayOrder: img.order,
              }))
            );
          }
        }

        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const listing = await db.getListingById(input.id);
        if (!listing || listing.userId !== ctx.user.id) {
          throw new Error("Listing not found or unauthorized");
        }

        await db.deleteListingImages(input.id);
        await db.deleteListing(input.id);
        return { success: true };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.union([z.number(), z.string()]) }))
      .query(async ({ input, ctx }) => {
        // 如果ID是字符串，尝试从Contentful获取
        if (typeof input.id === 'string') {
          const contentfulListing = await contentful.getListingById(input.id);
          if (contentfulListing) {
            return {
              ...contentfulListing,
              owner: { name: "小麒麟客服" },
              isFavorited: false,
            };
          }
          // 如果Contentful未配置，使用Mock数据
          const mockListing = mockListings.find(l => l.id === input.id);
          if (mockListing) {
            return {
              ...mockListing,
              owner: { name: "小麒麟客服" },
              isFavorited: false,
            };
          }
          return null;
        }
        
        const listing = await db.getListingById(input.id);
        if (!listing) return null;

        const images = await db.getListingImages(input.id);
        const owner = await db.getUserById(listing.userId);
        
        await db.incrementListingViewCount(input.id);
        
        if (ctx.user) {
          await db.addViewHistory(ctx.user.id, input.id);
        }

        let isFavorited = false;
        if (ctx.user) {
          isFavorited = await db.isFavorited(ctx.user.id, input.id);
        }

        return {
          ...listing,
          images,
          owner: owner ? { id: owner.id, name: owner.name, avatar: owner.avatar, email: owner.email, phone: owner.phone } : null,
          isFavorited,
        };
      }),

    search: publicProcedure
      .input(
        z.object({
          city: z.string().optional(),
          country: z.string().optional(),
          propertyType: z.string().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          availableFrom: z.date().optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        // 先从Contentful获取
        let contentfulListings: any[] = [];
        try {
          const allContentfulListings = await contentful.getAllListings();
          contentfulListings = allContentfulListings.filter(listing => {
            // 城市筛选：使用英文城市名匹配
            if (input.city) {
              const inputCityNormalized = input.city.toLowerCase().trim();
              const listingCityNormalized = (listing.city || '').toLowerCase().trim();
              console.log('[City Filter]', { inputCity: input.city, inputCityNormalized, listingCity: listing.city, listingCityNormalized });
              if (listingCityNormalized !== inputCityNormalized) {
                return false;
              }
            }
            if (input.country && listing.country !== input.country) return false;
            if (input.propertyType && listing.propertyType !== input.propertyType) return false;
            if (input.minPrice && parseFloat(listing.price) < input.minPrice) return false;
            if (input.maxPrice && parseFloat(listing.price) > input.maxPrice) return false;
            return true;
          });
        } catch (error) {
          console.warn('[Contentful] Failed to fetch, using mock data');
          // 如果Contentful失败，使用Mock数据
          contentfulListings = mockListings.filter(listing => {
            if (input.city && listing.city !== input.city) return false;
            if (input.country && listing.country !== input.country) return false;
            if (input.propertyType && listing.propertyType !== input.propertyType) return false;
            if (input.minPrice && parseFloat(listing.price) < input.minPrice) return false;
            if (input.maxPrice && parseFloat(listing.price) > input.maxPrice) return false;
            return true;
          });
        }
        
        // 再从数据库获取
        const dbListings = await db.searchListings(input);
        
        const listingsWithImages = await Promise.all(
          dbListings.map(async listing => {
            const images = await db.getListingImages(listing.id);
            return {
              ...listing,
              images,
            };
          })
        );

        // 合并结果，Contentful数据优先
        return [...contentfulListings, ...listingsWithImages].slice(input.offset, input.offset + input.limit);
      }),

    myListings: protectedProcedure.query(async ({ ctx }) => {
      const listings = await db.getListingsByUserId(ctx.user.id);
      
      const listingsWithImages = await Promise.all(
        listings.map(async listing => {
          const images = await db.getListingImages(listing.id);
          return {
            ...listing,
            images,
          };
        })
      );

      return listingsWithImages;
    }),
    
    incrementViewCount: publicProcedure
      .input(z.object({ id: z.union([z.number(), z.string()]) }))
      .mutation(async ({ input }) => {
        try {
          // 使用 KV 存储增加浏览次数
          const { getViewCountManager } = await import('./kv-storage');
          const viewCountManager = getViewCountManager();
          const id = String(input.id);
          const newCount = await viewCountManager.incrementViewCount(id);
          return { success: true, viewCount: newCount };
        } catch (error) {
          console.error('[incrementViewCount] Error:', error);
          return { success: false };
        }
      }),
  }),

  rentalRequests: router({
    create: protectedProcedure
      .input(
        z.object({
          city: z.string().min(1).max(100),
          country: z.string().min(1).max(100),
          propertyTypes: z.array(z.string()),
          budget: z.number().positive(),
          currency: z.string().default("GBP"),
          moveInDate: z.date(),
          moveOutDate: z.date().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const requestId = await db.createRentalRequest({
          ...input,
          budget: input.budget.toString(),
          propertyTypes: JSON.stringify(input.propertyTypes),
          userId: ctx.user.id,
          status: "active",
        });

        return { id: requestId };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          city: z.string().min(1).max(100).optional(),
          country: z.string().min(1).max(100).optional(),
          propertyTypes: z.array(z.string()).optional(),
          budget: z.number().positive().optional(),
          currency: z.string().optional(),
          moveInDate: z.date().optional(),
          moveOutDate: z.date().optional(),
          description: z.string().optional(),
          status: z.enum(["active", "fulfilled", "inactive"]).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, propertyTypes, ...updateData } = input;
        
        const request = await db.getRentalRequestById(id);
        if (!request || request.userId !== ctx.user.id) {
          throw new Error("Request not found or unauthorized");
        }

        const finalData: any = propertyTypes 
          ? { ...updateData, propertyTypes: JSON.stringify(propertyTypes) }
          : updateData;
        
        if (updateData.budget !== undefined) {
          finalData.budget = updateData.budget.toString();
        }

        await db.updateRentalRequest(id, finalData);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const request = await db.getRentalRequestById(input.id);
        if (!request || request.userId !== ctx.user.id) {
          throw new Error("Request not found or unauthorized");
        }

        await db.deleteRentalRequest(input.id);
        return { success: true };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.union([z.number(), z.string()]) }))
      .query(async ({ input }) => {
        // 如果是字符串ID，从Mock数据中查找
        if (typeof input.id === 'string') {
          const { mockRentalRequests } = await import('./rental-requests-mock');
          const request = mockRentalRequests.find(r => r.id === input.id);
          return request || null;
        }
        
        // 数字ID从数据库查找
        const request = await db.getRentalRequestById(input.id);
        if (!request) return null;

        const user = await db.getUserById(request.userId);
        
        return {
          ...request,
          propertyTypes: JSON.parse(request.propertyTypes),
          user: user ? { id: user.id, name: user.name, avatar: user.avatar } : null,
        };
      }),

    list: publicProcedure
      .input(
        z.object({
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        // 如果数据库不可用，返回Mock数据
        try {
          const requests = await db.getActiveRentalRequests(input.limit, input.offset);
          if (!requests || requests.length === 0) {
            const { mockRentalRequests } = await import('./rental-requests-mock');
            return mockRentalRequests.slice(input.offset, input.offset + input.limit);
          }
        
          const requestsWithUsers = await Promise.all(
            requests.map(async request => {
              const user = await db.getUserById(request.userId);
              return {
                ...request,
                propertyTypes: JSON.parse(request.propertyTypes),
                user: user ? { id: user.id, name: user.name, avatar: user.avatar } : null,
              };
            })
          );

          return requestsWithUsers;
        } catch (error) {
          console.error('[rentalRequests.list] Error:', error);
          const { mockRentalRequests } = await import('./rental-requests-mock');
          return mockRentalRequests.slice(input.offset, input.offset + input.limit);
        }
      }),

    myRequests: protectedProcedure.query(async ({ ctx }) => {
      const requests = await db.getRentalRequestsByUserId(ctx.user.id);
      return requests.map(request => ({
        ...request,
        propertyTypes: JSON.parse(request.propertyTypes),
      }));
    }),
  }),

  favorites: router({
    add: protectedProcedure
      .input(z.object({ listingId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.addFavorite(ctx.user.id, input.listingId);
        return { success: true };
      }),

    remove: protectedProcedure
      .input(z.object({ listingId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.removeFavorite(ctx.user.id, input.listingId);
        return { success: true };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      const favorites = await db.getUserFavorites(ctx.user.id);
      
      const favoritesWithListings = await Promise.all(
        favorites.map(async fav => {
          const listing = await db.getListingById(fav.listingId);
          if (!listing) return null;
          const images = await db.getListingImages(fav.listingId);
          return {
            ...fav,
            listing: {
              ...listing,
              images,
            },
          };
        })
      );

      return favoritesWithListings.filter(f => f !== null);
    }),
  }),

  viewHistory: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const history = await db.getUserViewHistory(ctx.user.id);
      
      const historyWithListings = await Promise.all(
        history.map(async h => {
          const listing = await db.getListingById(h.listingId);
          if (!listing) return null;
          const images = await db.getListingImages(h.listingId);
          return {
            ...h,
            listing: {
              ...listing,
              images,
            },
          };
        })
      );

      return historyWithListings.filter(h => h !== null);
    }),
  }),

  notifications: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserNotifications(ctx.user.id);
    }),

    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markNotificationAsRead(input.id);
        return { success: true };
      }),

    unreadCount: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUnreadNotificationCount(ctx.user.id);
    }),
  }),

  reviews: router({
    create: protectedProcedure
      .input(
        z.object({
          content: z.string().min(1),
          rating: z.number().min(1).max(5),
          city: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.createReview({
          userId: ctx.user.id,
          userName: ctx.user.name || undefined,
          city: input.city,
          content: input.content,
          rating: input.rating,
          isVisible: true,
        });
        return { success: true };
      }),

    list: publicProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ input }) => {
        return await db.getVisibleReviews(input.limit);
      }),

    getAll: publicProcedure
      .query(async () => {
        return await db.getVisibleReviews(200);
      }),
  }),

  articles: router({
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1).max(200),
          content: z.string().min(1),
          excerpt: z.string().optional(),
          coverImage: z.string().optional(),
          category: z.enum(["guide", "tips", "news", "city_life"]),
          isPublished: z.boolean().default(false),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const articleId = await db.createArticle({
          ...input,
          authorId: ctx.user.id,
        });
        return { id: articleId };
      }),

    getAll: publicProcedure
      .query(async () => {
        return await db.getPublishedArticles(undefined, 100, 0);
      }),

    list: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        try {
          const articles = await db.getPublishedArticles(input.category, input.limit, input.offset);
          if (!articles || articles.length === 0) {
            const { mockArticles } = await import('./articles-mock');
            return mockArticles.slice(input.offset, input.offset + input.limit);
          }
          return articles;
        } catch (error) {
          console.error('[articles.list] Error:', error);
          const { mockArticles } = await import('./articles-mock');
          return mockArticles.slice(input.offset, input.offset + input.limit);
        }
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const article = await db.getArticleById(input.id);
        if (!article) return null;

        await db.incrementArticleViewCount(input.id);
        
        const author = await db.getUserById(article.authorId);
        return {
          ...article,
          author: author ? { id: author.id, name: author.name, avatar: author.avatar } : null,
        };
      }),
  }),

  marketplace: router({
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1).max(200),
          description: z.string().optional(),
          price: z.number().positive(),
          currency: z.string().default("GBP"),
          category: z.string().min(1).max(50),
          condition: z.enum(["new", "like_new", "good", "fair", "poor"]),
          city: z.string().min(1).max(100),
          images: z.array(z.object({
            url: z.string(),
            key: z.string(),
            order: z.number(),
          })).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { images, ...itemData } = input;
        const itemId = await db.createMarketplaceItem({
          ...itemData,
          price: itemData.price.toString(),
          userId: ctx.user.id,
          status: "available",
        });

        if (images && images.length > 0) {
          await db.addMarketplaceImages(
            images.map(img => ({
              itemId: Number(itemId),
              imageUrl: img.url,
              imageKey: img.key,
              displayOrder: img.order,
            }))
          );
        }

        return { id: itemId };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(1).max(200).optional(),
          description: z.string().optional(),
          price: z.number().positive().optional(),
          currency: z.string().optional(),
          category: z.string().min(1).max(50).optional(),
          condition: z.enum(["new", "like_new", "good", "fair", "poor"]).optional(),
          city: z.string().min(1).max(100).optional(),
          status: z.enum(["available", "sold", "inactive"]).optional(),
          images: z.array(z.object({
            url: z.string(),
            key: z.string(),
            order: z.number(),
          })).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, images, ...updateData } = input;
        
        const item = await db.getMarketplaceItemById(id);
        if (!item || item.userId !== ctx.user.id) {
          throw new Error("Item not found or unauthorized");
        }

        const finalUpdateData: any = { ...updateData };
        if (updateData.price !== undefined) {
          finalUpdateData.price = updateData.price.toString();
        }
        await db.updateMarketplaceItem(id, finalUpdateData);

        if (images) {
          await db.deleteMarketplaceImages(id);
          if (images.length > 0) {
            await db.addMarketplaceImages(
              images.map(img => ({
                itemId: id,
                imageUrl: img.url,
                imageKey: img.key,
                displayOrder: img.order,
              }))
            );
          }
        }

        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const item = await db.getMarketplaceItemById(input.id);
        if (!item || item.userId !== ctx.user.id) {
          throw new Error("Item not found or unauthorized");
        }

        await db.deleteMarketplaceImages(input.id);
        await db.deleteMarketplaceItem(input.id);
        return { success: true };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const item = await db.getMarketplaceItemById(input.id);
        if (!item) return null;

        const images = await db.getMarketplaceImages(input.id);
        const owner = await db.getUserById(item.userId);
        
        await db.incrementMarketplaceItemViewCount(input.id);

        return {
          ...item,
          images,
          owner: owner ? { id: owner.id, name: owner.name, avatar: owner.avatar, email: owner.email, phone: owner.phone } : null,
        };
      }),

    getAll: publicProcedure
      .query(async () => {
        const items = await db.searchMarketplaceItems({});
        
        const itemsWithImages = await Promise.all(
          items.map(async item => {
            const images = await db.getMarketplaceImages(item.id);
            return {
              ...item,
              images: images.map(img => img.imageUrl),
            };
          })
        );

        return itemsWithImages;
      }),

    search: publicProcedure
      .input(
        z.object({
          city: z.string().optional(),
          category: z.string().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          condition: z.string().optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        const items = await db.searchMarketplaceItems(input);
        
        const itemsWithImages = await Promise.all(
          items.map(async item => {
            const images = await db.getMarketplaceImages(item.id);
            return {
              ...item,
              images,
            };
          })
        );

        return itemsWithImages;
      }),

    myItems: protectedProcedure.query(async ({ ctx }) => {
      const items = await db.getMarketplaceItemsByUserId(ctx.user.id);
      
      const itemsWithImages = await Promise.all(
        items.map(async item => {
          const images = await db.getMarketplaceImages(item.id);
          return {
            ...item,
            images,
          };
        })
      );

      return itemsWithImages;
    }),
  }),

  upload: router({
    image: protectedProcedure
      .input(
        z.object({
          base64: z.string(),
          filename: z.string(),
          contentType: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const buffer = Buffer.from(input.base64, "base64");
        const fileKey = `${ctx.user.id}/images/${nanoid()}-${input.filename}`;
        
        const { url } = await storagePut(fileKey, buffer, input.contentType);
        
        return {
          url,
          key: fileKey,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
