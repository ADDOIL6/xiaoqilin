// Cloudflare Workers API
// 处理房源数据请求和浏览计数

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // API路由
      if (path === '/api/listings') {
        return handleListings(request, env, corsHeaders);
      } else if (path.startsWith('/api/listings/')) {
        return handleListingDetail(request, env, corsHeaders, path);
      } else if (path === '/api/view-count') {
        return handleViewCount(request, env, corsHeaders);
      } else {
        return new Response('Not Found', { status: 404, headers: corsHeaders });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

// 获取房源列表
async function handleListings(request, env, corsHeaders) {
  const url = new URL(request.url);
  const country = url.searchParams.get('country');
  const city = url.searchParams.get('city');

  // 从KV获取所有房源
  const listingsData = await env.LISTINGS_KV.get('all_listings', { type: 'json' });
  
  if (!listingsData) {
    return new Response(JSON.stringify([]), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let filteredListings = listingsData;

  // 筛选逻辑
  if (city && city !== 'all') {
    filteredListings = listingsData.filter(
      (listing) => listing.city?.toLowerCase() === city.toLowerCase()
    );
  } else if (country && country !== 'all') {
    filteredListings = listingsData.filter(
      (listing) => listing.country === country
    );
  }

  return new Response(JSON.stringify(filteredListings), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// 获取房源详情
async function handleListingDetail(request, env, corsHeaders, path) {
  const id = path.split('/').pop();
  
  // 从KV获取房源详情
  const listing = await env.LISTINGS_KV.get(`listing_${id}`, { type: 'json' });
  
  if (!listing) {
    return new Response(JSON.stringify({ error: 'Listing not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // 增加浏览计数
  await incrementViewCount(env, id);

  return new Response(JSON.stringify(listing), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// 获取浏览计数
async function handleViewCount(request, env, corsHeaders) {
  const url = new URL(request.url);
  const listingId = url.searchParams.get('id');

  if (!listingId) {
    return new Response(JSON.stringify({ error: 'Missing listing ID' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const count = await env.VIEW_COUNT_KV.get(`views_${listingId}`);
  
  return new Response(JSON.stringify({ count: parseInt(count || '0') }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// 增加浏览计数
async function incrementViewCount(env, listingId) {
  const key = `views_${listingId}`;
  const currentCount = await env.VIEW_COUNT_KV.get(key);
  const newCount = parseInt(currentCount || '0') + 1;
  await env.VIEW_COUNT_KV.put(key, newCount.toString());
  return newCount;
}
