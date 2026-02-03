import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://xiaoqilin-api.YOUR_SUBDOMAIN.workers.dev';

export function useViewCount(listingId: string) {
  const [viewCount, setViewCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    // 获取浏览计数
    fetch(`${API_URL}/api/view-count?id=${listingId}`)
      .then((res) => res.json())
      .then((data) => {
        setViewCount(data.count || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch view count:', error);
        setLoading(false);
      });
  }, [listingId]);

  return { viewCount, loading };
}
