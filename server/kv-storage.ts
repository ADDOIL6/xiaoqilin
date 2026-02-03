// Cloudflare KV 存储管理模块

export interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

// 浏览次数管理
export class ViewCountManager {
  private kv: KVNamespace;
  private prefix = "viewcount:";

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  // 获取浏览次数
  async getViewCount(listingId: string): Promise<number> {
    const key = `${this.prefix}${listingId}`;
    const value = await this.kv.get(key);
    return value ? parseInt(value, 10) : 0;
  }

  // 增加浏览次数
  async incrementViewCount(listingId: string): Promise<number> {
    const currentCount = await this.getViewCount(listingId);
    const newCount = currentCount + 1;
    const key = `${this.prefix}${listingId}`;
    await this.kv.put(key, newCount.toString());
    return newCount;
  }

  // 设置浏览次数
  async setViewCount(listingId: string, count: number): Promise<void> {
    const key = `${this.prefix}${listingId}`;
    await this.kv.put(key, count.toString());
  }

  // 重置浏览次数
  async resetViewCount(listingId: string): Promise<void> {
    const key = `${this.prefix}${listingId}`;
    await this.kv.delete(key);
  }
}

// 内存模拟KV（用于开发环境）
export class MemoryKV implements KVNamespace {
  private storage: Map<string, string> = new Map();

  async get(key: string): Promise<string | null> {
    return this.storage.get(key) || null;
  }

  async put(key: string, value: string): Promise<void> {
    this.storage.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.storage.delete(key);
  }
}

// 获取KV实例（根据环境自动选择）
export function getKVInstance(): KVNamespace {
  // 在Cloudflare Workers环境中，KV会通过环境变量注入
  // 在开发环境中，使用内存模拟
  if (typeof LISTING_DATA !== 'undefined') {
    return LISTING_DATA as any;
  }
  
  // 开发环境使用内存KV
  return new MemoryKV();
}

// 全局ViewCountManager实例
let viewCountManager: ViewCountManager | null = null;

export function getViewCountManager(): ViewCountManager {
  if (!viewCountManager) {
    const kv = getKVInstance();
    viewCountManager = new ViewCountManager(kv);
  }
  return viewCountManager;
}
