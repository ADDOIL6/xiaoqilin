import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  avatar: text("avatar"),
  phone: varchar("phone", { length: 20 }),
  bio: text("bio"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Listings table for rental properties
 */
export const listings = mysqlTable("listings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  propertyType: mysqlEnum("propertyType", [
    "studio",
    "1b1b",
    "2b2b",
    "3b3b",
    "4b4b",
    "other"
  ]).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  address: text("address").notNull(),
  postcode: varchar("postcode", { length: 20 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("GBP").notNull(),
  availableFrom: timestamp("availableFrom").notNull(),
  availableTo: timestamp("availableTo"),
  minRentalPeriod: int("minRentalPeriod"),
  furnished: boolean("furnished").default(false),
  billsIncluded: boolean("billsIncluded").default(false),
  status: mysqlEnum("status", ["active", "rented", "inactive"]).default("active").notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  // New fields for enhanced listing features
  videoUrl: text("videoUrl"),
  videoKey: text("videoKey"),
  hasVideo: boolean("hasVideo").default(false).notNull(),
  isVip: boolean("isVip").default(false).notNull(),
  isVerified: boolean("isVerified").default(false).notNull(),
  isStudentCertified: boolean("isStudentCertified").default(false).notNull(),
  apartmentType: varchar("apartmentType", { length: 50 }),
  amenities: text("amenities"),
  publishedAt: timestamp("publishedAt"),
  listingNumber: varchar("listingNumber", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Listing = typeof listings.$inferSelect;
export type InsertListing = typeof listings.$inferInsert;

/**
 * Listing images table
 */
export const listingImages = mysqlTable("listingImages", {
  id: int("id").autoincrement().primaryKey(),
  listingId: int("listingId").notNull(),
  imageUrl: text("imageUrl").notNull(),
  imageKey: text("imageKey").notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ListingImage = typeof listingImages.$inferSelect;
export type InsertListingImage = typeof listingImages.$inferInsert;

/**
 * Rental requests table for people looking for accommodation
 */
export const rentalRequests = mysqlTable("rentalRequests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  propertyTypes: text("propertyTypes").notNull(),
  budget: decimal("budget", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("GBP").notNull(),
  moveInDate: timestamp("moveInDate").notNull(),
  moveOutDate: timestamp("moveOutDate"),
  description: text("description"),
  status: mysqlEnum("status", ["active", "fulfilled", "inactive"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RentalRequest = typeof rentalRequests.$inferSelect;
export type InsertRentalRequest = typeof rentalRequests.$inferInsert;

/**
 * Favorites table for saved listings
 */
export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  listingId: int("listingId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

/**
 * View history table
 */
export const viewHistory = mysqlTable("viewHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  listingId: int("listingId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ViewHistory = typeof viewHistory.$inferSelect;
export type InsertViewHistory = typeof viewHistory.$inferInsert;

/**
 * Notifications table
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  type: mysqlEnum("type", ["match", "message", "system"]).notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  relatedListingId: int("relatedListingId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Reviews table for user testimonials
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  userName: varchar("userName", { length: 100 }),
  city: varchar("city", { length: 100 }),
  content: text("content").notNull(),
  rating: int("rating").notNull(),
  isVisible: boolean("isVisible").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Articles table for guides and tips
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  authorId: int("authorId").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("coverImage"),
  category: mysqlEnum("category", ["guide", "tips", "news", "city_life"]).notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

/**
 * Marketplace items table for second-hand goods
 */
export const marketplaceItems = mysqlTable("marketplaceItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("GBP").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  condition: mysqlEnum("condition", ["new", "like_new", "good", "fair", "poor"]).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["available", "sold", "inactive"]).default("available").notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MarketplaceItem = typeof marketplaceItems.$inferSelect;
export type InsertMarketplaceItem = typeof marketplaceItems.$inferInsert;

/**
 * Marketplace item images table
 */
export const marketplaceImages = mysqlTable("marketplaceImages", {
  id: int("id").autoincrement().primaryKey(),
  itemId: int("itemId").notNull(),
  imageUrl: text("imageUrl").notNull(),
  imageKey: text("imageKey").notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MarketplaceImage = typeof marketplaceImages.$inferSelect;
export type InsertMarketplaceImage = typeof marketplaceImages.$inferInsert;
