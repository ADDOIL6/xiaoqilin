import { createClient } from "contentful";
import { getViewCountManager } from "./kv-storage";

// Contentful 配置
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "";
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || "";
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";

// 创建 Contentful 客户端
let contentfulClient: ReturnType<typeof createClient> | null = null;

export function getContentfulClient() {
  if (!contentfulClient && CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN) {
    contentfulClient = createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
      environment: CONTENTFUL_ENVIRONMENT,
    });
  }
  return contentfulClient;
}

// Contentful Listing 类型定义
export interface ContentfulListing {
  title: string;
  listingNumber: string;
  description: string;
  propertyType: string;
  apartmentType?: string;
  city: string;
  country: string;
  address: string;
  postcode: string;
  latitude?: string;
  longitude?: string;
  price: string;
  currency: string;
  availableFrom: string;
  availableTo?: string;
  minRentalPeriod: number;
  furnished: boolean;
  billsIncluded: boolean;
  amenities?: string[];
  images: Array<{
    url: string;
    title?: string;
    description?: string;
  }>;
  videoUrl?: string;
  hasVideo?: boolean;
  isVip?: boolean;
  isVerified?: boolean;
  isStudentCertified?: boolean;
  publishedAt: string;
  viewCount?: number;
  status: string;
}

// 从 Contentful Entry 转换为 Listing 对象
function parseContentfulListing(entry: Entry<any>): ContentfulListing & { id: string } {
  const fields = entry.fields;
  
  // 解析图片
  const images = fields.images?.map((image: any) => ({
    url: image.fields.file.url.startsWith("//") 
      ? `https:${image.fields.file.url}` 
      : image.fields.file.url,
    title: image.fields.title || "",
    description: image.fields.description || "",
  })) || [];
  
  // 解析设施列表
  let amenities: string[] = [];
  if (fields.amenities) {
    try {
      amenities = typeof fields.amenities === "string" 
        ? JSON.parse(fields.amenities) 
        : fields.amenities;
    } catch (e) {
      console.warn("Failed to parse amenities:", e);
    }
  }
  
  return {
    id: entry.sys.id,
    title: fields.title || "",
    listingNumber: fields.listingNumber || "",
    description: fields.description || "",
    propertyType: fields.propertyType || "",
    apartmentType: fields.apartmentType,
    city: fields.city || "",
    country: fields.country || "",
    address: fields.address || "",
    postcode: fields.postcode || "",
    latitude: fields.latitude,
    longitude: fields.longitude,
    price: fields.price || "0",
    currency: fields.currency || "USD",
    availableFrom: fields.availableFrom || new Date().toISOString(),
    availableTo: fields.availableTo,
    minRentalPeriod: fields.minRentalPeriod || 1,
    furnished: fields.furnished || false,
    billsIncluded: fields.billsIncluded || false,
    amenities,
    images,
    videoUrl: fields.videoUrl,
    hasVideo: fields.hasVideo || false,
    isVip: fields.isVip || false,
    isVerified: fields.isVerified || false,
    isStudentCertified: fields.isStudentCertified || false,
    publishedAt: fields.publishedAt || entry.sys.createdAt,
    viewCount: fields.viewCount || 0,
    status: fields.status || "active",
  };
}

// 获取所有房源
export async function getAllListings() {
  const client = getContentfulClient();
  let listings: any[] = [];
  
  if (!client) {
    console.warn("[Contentful] Client not initialized, using mock data");
    // 返图Mock数据
    const { mockListings } = await import('./contentful-mock');
    listings = mockListings;
  } else {
    try {
      const response = await client.getEntries({
        content_type: "listing",
        order: ["-fields.publishedAt"],
      });
      
      listings = response.items.map(parseContentfulListing);
    } catch (error) {
      console.error("[Contentful] Failed to fetch listings:", error);
      return [];
    }
  }
  
  // 为没有status和publishedAt的房源设置默认值
  listings = listings.map(l => ({
    ...l,
    status: l.status || 'active',
    publishedAt: l.publishedAt || new Date().toISOString(),
  }));
  
  // 排序逻辑：活跃房源按发布时间降序，已租出房源排在后面
  const activeListings = listings.filter(l => l.status === 'active')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  const rentedListings = listings.filter(l => l.status === 'rented')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  // 过滤掉已租出超过1周的房源
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const filteredRentedListings = rentedListings.filter(l => {
    const publishedDate = new Date(l.publishedAt);
    return publishedDate >= oneWeekAgo;
  });
  
  return [...activeListings, ...filteredRentedListings];
}

// 获取单个房源
export async function getListingById(id: string) {
  const client = getContentfulClient();
  let listing = null;
  
  if (!client) {
    console.warn("[Contentful] Client not initialized, using mock data");
    // 返回Mock数据
    const { mockListings } = await import('./contentful-mock');
    listing = mockListings.find(l => l.id === id) || null;
  } else {
    try {
      const entry = await client.getEntry(id);
      listing = parseContentfulListing(entry);
    } catch (error) {
      console.error("[Contentful] Failed to fetch listing:", error);
      return null;
    }
  }
  
  // 从 KV 中获取浏览次数
  if (listing) {
    try {
      const viewCountManager = getViewCountManager();
      const viewCount = await viewCountManager.getViewCount(id);
      listing.viewCount = viewCount;
    } catch (error) {
      console.error("[KV] Failed to get view count:", error);
    }
  }
  
  return listing;
}

// 获取最新房源（用于首页展示）
export async function getLatestListings(limit: number = 6) {
  const client = getContentfulClient();
  if (!client) {
    console.warn("[Contentful] Client not initialized, using mock data");
    // 返回Mock数据
    const { mockListings } = await import('./contentful-mock');
    return mockListings.slice(0, limit);
  }
  
  try {
    const response = await client.getEntries({
      content_type: "listing",
      order: ["-fields.publishedAt"],
      limit,
      "fields.status": "active",
    });
    
    return response.items.map(parseContentfulListing);
  } catch (error) {
    console.error("[Contentful] Failed to fetch latest listings:", error);
    return [];
  }
}

// 按城市搜索房源
export async function getListingsByCity(city: string) {
  const client = getContentfulClient();
  if (!client) {
    console.warn("[Contentful] Client not initialized");
    return [];
  }
  
  try {
    const response = await client.getEntries({
      content_type: "listing",
      "fields.city": city,
      "fields.status": "active",
      order: ["-fields.publishedAt"],
    });
    
    return response.items.map(parseContentfulListing);
  } catch (error) {
    console.error("[Contentful] Failed to fetch listings by city:", error);
    return [];
  }
}

// 增加浏览次数（需要使用 Management API，这里仅作示例）
export async function incrementViewCount(id: string) {
  // 注意：Content Delivery API 是只读的
  // 要更新内容需要使用 Content Management API
  // 这里仅作为占位符，实际实现需要额外配置
  console.log(`[Contentful] View count increment for listing ${id} (not implemented)`);
}
