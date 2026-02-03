import { eq, and, desc, asc, gte, lte, like, or, sql, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  listings,
  InsertListing,
  listingImages,
  InsertListingImage,
  rentalRequests,
  InsertRentalRequest,
  favorites,
  InsertFavorite,
  viewHistory,
  InsertViewHistory,
  notifications,
  InsertNotification,
  reviews,
  InsertReview,
  articles,
  InsertArticle,
  marketplaceItems,
  InsertMarketplaceItem,
  marketplaceImages,
  InsertMarketplaceImage,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "avatar", "phone", "bio"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Listings
export async function createListing(listing: InsertListing) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(listings).values(listing);
  return result[0].insertId;
}

export async function getListingById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(listings).where(eq(listings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getListingsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(listings).where(eq(listings.userId, userId)).orderBy(desc(listings.createdAt));
}

export async function updateListing(id: number, data: Partial<InsertListing>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(listings).set(data).where(eq(listings.id, id));
}

export async function deleteListing(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(listings).where(eq(listings.id, id));
}

export async function searchListings(filters: {
  city?: string;
  country?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  availableFrom?: Date;
  status?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(listings.status, "active")];

  if (filters.city) {
    conditions.push(like(listings.city, `%${filters.city}%`));
  }
  if (filters.country) {
    conditions.push(eq(listings.country, filters.country));
  }
  if (filters.propertyType) {
    conditions.push(eq(listings.propertyType, filters.propertyType as any));
  }
  if (filters.minPrice !== undefined) {
    conditions.push(gte(listings.price, filters.minPrice.toString()));
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(lte(listings.price, filters.maxPrice.toString()));
  }
  if (filters.availableFrom) {
    conditions.push(lte(listings.availableFrom, filters.availableFrom));
  }

  return await db
    .select()
    .from(listings)
    .where(and(...conditions))
    .orderBy(desc(listings.createdAt))
    .limit(filters.limit || 20)
    .offset(filters.offset || 0);
}

export async function incrementListingViewCount(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(listings).set({ viewCount: sql`${listings.viewCount} + 1` }).where(eq(listings.id, id));
}

// Listing Images
export async function addListingImages(images: InsertListingImage[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(listingImages).values(images);
}

export async function getListingImages(listingId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(listingImages).where(eq(listingImages.listingId, listingId)).orderBy(asc(listingImages.displayOrder));
}

export async function deleteListingImages(listingId: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(listingImages).where(eq(listingImages.listingId, listingId));
}

// Rental Requests
export async function createRentalRequest(request: InsertRentalRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(rentalRequests).values(request);
  return result[0].insertId;
}

export async function getRentalRequestById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(rentalRequests).where(eq(rentalRequests.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getRentalRequestsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(rentalRequests).where(eq(rentalRequests.userId, userId)).orderBy(desc(rentalRequests.createdAt));
}

export async function getActiveRentalRequests(limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(rentalRequests).where(eq(rentalRequests.status, "active")).orderBy(desc(rentalRequests.createdAt)).limit(limit).offset(offset);
}

export async function updateRentalRequest(id: number, data: Partial<InsertRentalRequest>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(rentalRequests).set(data).where(eq(rentalRequests.id, id));
}

export async function deleteRentalRequest(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(rentalRequests).where(eq(rentalRequests.id, id));
}

// Favorites
export async function addFavorite(userId: number, listingId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(favorites).values({ userId, listingId });
}

export async function removeFavorite(userId: number, listingId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(favorites).where(and(eq(favorites.userId, userId), eq(favorites.listingId, listingId)));
}

export async function getUserFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(favorites).where(eq(favorites.userId, userId)).orderBy(desc(favorites.createdAt));
}

export async function isFavorited(userId: number, listingId: number) {
  const db = await getDb();
  if (!db) return false;

  const result = await db.select().from(favorites).where(and(eq(favorites.userId, userId), eq(favorites.listingId, listingId))).limit(1);
  return result.length > 0;
}

// View History
export async function addViewHistory(userId: number | null, listingId: number) {
  const db = await getDb();
  if (!db) return;

  await db.insert(viewHistory).values({ userId, listingId });
}

export async function getUserViewHistory(userId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(viewHistory).where(eq(viewHistory.userId, userId)).orderBy(desc(viewHistory.createdAt)).limit(limit);
}

// Notifications
export async function createNotification(notification: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(notifications).values(notification);
}

export async function getUserNotifications(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(limit);
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
}

export async function getUnreadNotificationCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;

  const result = await db.select({ count: sql<number>`count(*)` }).from(notifications).where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
  return result[0]?.count || 0;
}

// Reviews
export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(reviews).values(review);
}

export async function getVisibleReviews(limit: number = 20) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(reviews).where(eq(reviews.isVisible, true)).orderBy(desc(reviews.createdAt)).limit(limit);
}

// Articles
export async function createArticle(article: InsertArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(articles).values(article);
  return result[0].insertId;
}

export async function getPublishedArticles(category?: string, limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(articles.isPublished, true)];
  if (category) {
    conditions.push(eq(articles.category, category as any));
  }

  return await db.select().from(articles).where(and(...conditions)).orderBy(desc(articles.createdAt)).limit(limit).offset(offset);
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function incrementArticleViewCount(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(articles).set({ viewCount: sql`${articles.viewCount} + 1` }).where(eq(articles.id, id));
}

// Marketplace Items
export async function createMarketplaceItem(item: InsertMarketplaceItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(marketplaceItems).values(item);
  return result[0].insertId;
}

export async function getMarketplaceItemById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(marketplaceItems).where(eq(marketplaceItems.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getMarketplaceItemsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(marketplaceItems).where(eq(marketplaceItems.userId, userId)).orderBy(desc(marketplaceItems.createdAt));
}

export async function searchMarketplaceItems(filters: {
  city?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  status?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(marketplaceItems.status, "available")];

  if (filters.city) {
    conditions.push(like(marketplaceItems.city, `%${filters.city}%`));
  }
  if (filters.category) {
    conditions.push(eq(marketplaceItems.category, filters.category));
  }
  if (filters.minPrice !== undefined) {
    conditions.push(gte(marketplaceItems.price, filters.minPrice.toString()));
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(lte(marketplaceItems.price, filters.maxPrice.toString()));
  }
  if (filters.condition) {
    conditions.push(eq(marketplaceItems.condition, filters.condition as any));
  }

  return await db
    .select()
    .from(marketplaceItems)
    .where(and(...conditions))
    .orderBy(desc(marketplaceItems.createdAt))
    .limit(filters.limit || 20)
    .offset(filters.offset || 0);
}

export async function updateMarketplaceItem(id: number, data: Partial<InsertMarketplaceItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(marketplaceItems).set(data).where(eq(marketplaceItems.id, id));
}

export async function deleteMarketplaceItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(marketplaceItems).where(eq(marketplaceItems.id, id));
}

export async function incrementMarketplaceItemViewCount(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(marketplaceItems).set({ viewCount: sql`${marketplaceItems.viewCount} + 1` }).where(eq(marketplaceItems.id, id));
}

// Marketplace Item Images
export async function addMarketplaceImages(images: InsertMarketplaceImage[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(marketplaceImages).values(images);
}

export async function getMarketplaceImages(itemId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(marketplaceImages).where(eq(marketplaceImages.itemId, itemId)).orderBy(asc(marketplaceImages.displayOrder));
}

export async function deleteMarketplaceImages(itemId: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(marketplaceImages).where(eq(marketplaceImages.itemId, itemId));
}
