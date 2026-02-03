// Mock Contentful 数据 - 用于测试和演示
// 当 Contentful 未配置时使用此数据

export const mockListings = [
  {
    id: "boston-luxury-apartment",
    title: "Boston Luxury Apartment - Downtown Seaport",
    listingNumber: "B10001",
    description: `位于波士顿海港区的豪华公寓，步行5分钟到地铁站。

【房源亮点】
✨ 全新装修，拎包入住
✨ 24小时门卫服务  
✨ 健身房、游泳池、屋顶花园
✨ 靠近哈佛大学、MIT
✨ 周边餐饮、购物便利

【交通便利】
🚇 步行5分钟到红线地铁站
🚌 多条公交线路直达
🚗 提供停车位

【周边配套】
🏪 Whole Foods超市（步行3分钟）
🍕 各国餐厅林立
🏥 麻省总医院（10分钟车程）
🎓 哈佛大学（15分钟地铁）

欢迎预约看房！`,
    propertyType: "2b2b",
    apartmentType: "高端公寓",
    city: "Boston",
    country: "United States",
    address: "100 Seaport Blvd, Boston, MA 02210",
    postcode: "02210",
    latitude: "42.3501",
    longitude: "-71.0453",
    price: "2800",
    currency: "USD",
    availableFrom: "2026-02-01",
    availableTo: "2027-01-31",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有空调",
      "有阳台",
      "有前台",
      "带停车位",
      "有独立洗衣机",
      "有地暖",
      "有独立烘干机",
      "有健身房",
      "有游泳池",
      "有屋顶花园"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        title: "Living Room",
        description: "Spacious living room with city views"
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        title: "Bedroom",
        description: "Master bedroom"
      },
      {
        url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80",
        title: "Kitchen",
        description: "Modern kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
        title: "Bathroom",
        description: "Luxury bathroom"
      },
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        title: "City View",
        description: "Amazing city view"
      },
      {
        url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&q=80",
        title: "Building Exterior",
        description: "Building entrance"
      }
    ],
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    hasVideo: true,
    isVip: true,
    isVerified: true,
    isStudentCertified: true,
    publishedAt: "2026-01-24T10:00:00Z",
    viewCount: 156,
    status: "active"
  },
  {
    id: "manchester-student-apartment",
    title: "Manchester Student Apartment - City Centre",
    listingNumber: "M10001",
    description: `曼彻斯特市中心学生公寓，步行到曼彻斯特大学仅需10分钟。

【房源特色】
📚 学生专属社区
🏫 靠近曼彻斯特大学、曼彻斯特城市大学
🛡️ 24小时安保
💻 高速WiFi全覆盖
🧺 公共洗衣房

【周边设施】
🛒 Tesco超市（步行2分钟）
📖 市中心图书馆（步行5分钟）
🚇 Piccadilly地铁站（步行8分钟）
🍔 各类餐厅咖啡馆

适合学生居住！`,
    propertyType: "1b1b",
    apartmentType: "学生公寓",
    city: "Manchester",
    country: "United Kingdom",
    address: "Oxford Road, Manchester M13 9PL",
    postcode: "M13 9PL",
    latitude: "53.4668",
    longitude: "-2.2339",
    price: "850",
    currency: "GBP",
    availableFrom: "2026-09-01",
    minRentalPeriod: 9,
    furnished: true,
    billsIncluded: true,
    amenities: [
      "有电梯",
      "有空调",
      "有前台",
      "有独立洗衣机",
      "包含网费",
      "包含水电费",
      "有学习室"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80",
        title: "Studio Room",
        description: "Cozy studio apartment"
      },
      {
        url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80",
        title: "Study Area",
        description: "Perfect study space"
      },
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        title: "Kitchen",
        description: "Compact kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=80",
        title: "Common Area",
        description: "Student lounge"
      }
    ],
    hasVideo: false,
    isVip: false,
    isVerified: false,
    isStudentCertified: true,
    publishedAt: "2026-01-23T14:30:00Z",
    viewCount: 89,
    status: "active"
  },
  {
    id: "newyork-manhattan-apartment",
    title: "New York Stylish Apartment - Manhattan",
    listingNumber: "N10001",
    description: `纽约曼哈顿时尚公寓，地铁直达，生活便利。

【房源优势】
🌆 曼哈顿中城黄金地段
🚇 地铁站楼下，出行便利
🏢 靠近时代广场、中央公园
🛍️ 购物天堂，各大品牌店铺
🍽️ 米其林餐厅云集

【公寓设施】
🏋️ 健身中心
🏊 室内泳池
🧖 桑拿房
👔 商务中心
🎬 私人影院

【交通位置】
🚇 Times Square地铁站（步行3分钟）
🚌 多条公交线路
✈️ JFK机场（40分钟车程）

纽约生活，从这里开始！`,
    propertyType: "1b1b",
    apartmentType: "高端公寓",
    city: "New York",
    country: "United States",
    address: "350 W 42nd St, New York, NY 10036",
    postcode: "10036",
    latitude: "40.7589",
    longitude: "-73.9911",
    price: "3500",
    currency: "USD",
    availableFrom: "2026-03-01",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有空调",
      "有阳台",
      "有前台",
      "带停车位",
      "有独立洗衣机",
      "有独立烘干机",
      "有健身房",
      "有游泳池",
      "有商务中心"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
        title: "Living Room",
        description: "Modern living space"
      },
      {
        url: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&q=80",
        title: "Bedroom",
        description: "Comfortable bedroom"
      },
      {
        url: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80",
        title: "Kitchen",
        description: "Stylish kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        title: "Bathroom",
        description: "Modern bathroom"
      },
      {
        url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1200&q=80",
        title: "City View",
        description: "Manhattan skyline view"
      }
    ],
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    hasVideo: true,
    isVip: true,
    isVerified: true,
    isStudentCertified: false,
    publishedAt: "2026-01-22T09:15:00Z",
    viewCount: 234,
    status: "active"
  },
  {
    id: "london-modern-flat",
    title: "London Modern Flat - Zone 1",
    listingNumber: "L10001",
    description: `伦敦一区现代公寓，交通便利，生活配套齐全。

【位置优势】
🏙️ Zone 1核心地段
🚇 地铁站步行2分钟
🏛️ 靠近大英博物馆
🎭 West End剧院区
🛍️ Oxford Street购物街

【公寓特色】
✨ 2023年全新装修
🪟 落地窗，采光极佳
🔒 安全门禁系统
📦 包裹代收服务

【周边生活】
🏪 Sainsbury's超市（楼下）
☕ 精品咖啡馆林立
🍜 中餐、日料、西餐应有尽有
🏥 NHS诊所（步行5分钟）

伦敦生活首选！`,
    propertyType: "studio",
    apartmentType: "现代公寓",
    city: "London",
    country: "United Kingdom",
    address: "Russell Square, London WC1B 5EH",
    postcode: "WC1B 5EH",
    latitude: "51.5225",
    longitude: "-0.1245",
    price: "1650",
    currency: "GBP",
    availableFrom: "2026-02-15",
    minRentalPeriod: 6,
    furnished: true,
    billsIncluded: true,
    amenities: [
      "有电梯",
      "有空调",
      "有前台",
      "有独立洗衣机",
      "包含网费",
      "包含水电费"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=80",
        title: "Studio",
        description: "Modern studio flat"
      },
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        title: "Kitchen Area",
        description: "Kitchenette"
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
        title: "Bathroom",
        description: "Clean bathroom"
      },
      {
        url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
        title: "Street View",
        description: "Building exterior"
      }
    ],
    hasVideo: false,
    isVip: false,
    isVerified: true,
    isStudentCertified: false,
    publishedAt: "2026-01-21T16:45:00Z",
    viewCount: 178,
    status: "active"
  },
  // 多伦多房源
  {
    id: "toronto-downtown-condo",
    title: "Toronto Downtown Condo - CN Tower View",
    listingNumber: "T10001",
    description: `多伦多市中心豪华公寓，CN塔景观。

【房源亮点】
✨ 全新装修，现代设计
✨ 24小时礼宾服务
✨ 健身房、桑拿房
✨ 靠近多伦多大学
✨ 周边生活便利`,
    propertyType: "1b1b",
    apartmentType: "高端公寓",
    city: "Toronto",
    country: "Canada",
    address: "10 York St, Toronto, ON M5J 2Z2",
    postcode: "M5J 2Z2",
    latitude: "43.6426",
    longitude: "-79.3871",
    price: "2200",
    currency: "CAD",
    availableFrom: "2026-03-01",
    availableTo: "2027-02-28",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有空调",
      "有阳台",
      "有前台",
      "带停车位",
      "有独立洗衣机",
      "有健身房",
      "有桑拿房"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80",
        title: "Living Room",
        description: "Modern living space"
      },
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        title: "City View",
        description: "CN Tower view"
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        title: "Bedroom",
        description: "Comfortable bedroom"
      },
      {
        url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80",
        title: "Kitchen",
        description: "Modern kitchen"
      }
    ],
    isVip: true,
    isVerified: true,
    isStudentCertified: false,
    publishedAt: "2026-01-23T10:00:00Z",
    viewCount: 89,
    status: "active"
  },
  // 温哥华房源
  {
    id: "vancouver-waterfront-apartment",
    title: "Vancouver Waterfront Apartment - Ocean View",
    listingNumber: "V10001",
    description: `温哥华海滨公寓，无敌海景。

【房源亮点】
✨ 海景房，视野开阔
✨ 高层公寓，采光极佳
✨ 健身房、游泳池
✨ 靠近UBC`,
    propertyType: "2b2b",
    apartmentType: "海景公寓",
    city: "Vancouver",
    country: "Canada",
    address: "1188 W Pender St, Vancouver, BC V6E 2S8",
    postcode: "V6E 2S8",
    latitude: "49.2827",
    longitude: "-123.1207",
    price: "2500",
    currency: "CAD",
    availableFrom: "2026-02-15",
    availableTo: "2027-02-14",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有空调",
      "有阳台",
      "有前台",
      "有独立洗衣机",
      "有健身房",
      "有游泳池"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        title: "Living Room",
        description: "Spacious living area"
      },
      {
        url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
        title: "Ocean View",
        description: "Beautiful ocean view"
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        title: "Bedroom",
        description: "Master bedroom"
      },
      {
        url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80",
        title: "Kitchen",
        description: "Modern kitchen"
      }
    ],
    isVip: false,
    isVerified: true,
    isStudentCertified: true,
    publishedAt: "2026-01-22T10:00:00Z",
    viewCount: 134,
    status: "active"
  },
  // 已租出的伦敦房源
  {
    id: "london-rented-apartment",
    title: "London City Center Apartment",
    listingNumber: "L10002",
    description: `伦敦市中心公寓。`,
    propertyType: "1b1b",
    apartmentType: "市中心公寓",
    city: "London",
    country: "United Kingdom",
    address: "50 Liverpool St, London EC2M 7PY",
    postcode: "EC2M 7PY",
    latitude: "51.5155",
    longitude: "-0.0824",
    price: "1800",
    currency: "GBP",
    availableFrom: "2026-01-01",
    availableTo: "2026-12-31",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有前台",
      "有健身房"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        title: "Living Room",
        description: "Living area"
      }
    ],
    isVip: false,
    isVerified: true,
    isStudentCertified: false,
    publishedAt: "2025-12-15T10:00:00Z",
    viewCount: 245,
    status: "rented"
  },
  // 已租出的纽约房源
  {
    id: "newyork-rented-studio",
    title: "New York Studio",
    listingNumber: "N10002",
    description: `纽约曼哈顿Studio。`,
    propertyType: "studio",
    apartmentType: "Studio",
    city: "New York",
    country: "United States",
    address: "123 W 44th St, New York, NY 10036",
    postcode: "10036",
    latitude: "40.7580",
    longitude: "-73.9855",
    price: "2500",
    currency: "USD",
    availableFrom: "2025-12-01",
    availableTo: "2026-11-30",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: true,
    amenities: [
      "有电梯",
      "有前台"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80",
        title: "Studio",
        description: "Cozy studio"
      }
    ],
    isVip: false,
    isVerified: false,
    isStudentCertified: false,
    publishedAt: "2025-11-20T10:00:00Z",
    viewCount: 312,
    status: "rented"
  },
  // 新增房源 - 洛杉矶豪华公寓
  {
    id: "la-luxury-2b2b",
    title: "Los Angeles Luxury 2B2B - Downtown LA",
    listingNumber: "LA10001",
    description: `洛杉矶市中心豪华两室两卫公寓，步行可达各大景点。

【房源亮点】
✨ 全景落地窗，城市天际线美景
✨ 24小时礼宾服务
✨ 健身房、游泳池、SPA
✨ 靠近USC、UCLA
✨ 周边餐饮、娱乐丰富

【交通便利】
🚇 步行3分钟到地铁站
🚗 提供地下停车位
🚌 多条公交线路

【周边配套】
🏪 Whole Foods超市（步行5分钟）
🍕 各国美食餐厅
🏥 医疗中心（5分钟车程）

欢迎预约看房！`,
    propertyType: "2b2b",
    apartmentType: "豪华公寓",
    city: "Los Angeles",
    country: "United States",
    address: "1234 S Figueroa St, Los Angeles, CA 90015",
    postcode: "90015",
    latitude: "34.0407",
    longitude: "-118.2668",
    price: "3200",
    currency: "USD",
    availableFrom: "2026-03-01",
    availableTo: "2027-02-28",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有空调",
      "有阳台",
      "有前台",
      "带停车位",
      "有独立洗衣机",
      "有独立烘干机",
      "有健身房",
      "有游泳池"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        title: "Living Room",
        description: "Spacious living room with panoramic views"
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        title: "Master Bedroom",
        description: "Modern master bedroom"
      },
      {
        url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80",
        title: "Kitchen",
        description: "Designer kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        title: "City View",
        description: "Amazing downtown LA view"
      }
    ],
    isVip: true,
    isVerified: true,
    isStudentCertified: true,
    publishedAt: "2026-01-25T08:00:00Z",
    viewCount: 89,
    status: "active"
  },
  // 新增房源 - 旧金山Studio
  {
    id: "sf-studio-downtown",
    title: "San Francisco Studio - Financial District",
    listingNumber: "SF10001",
    description: `旧金山金融区精品Studio，交通便利。

【房源亮点】
✨ 现代简约装修
✨ 24小时门卫
✨ 健身房
✨ 靠近BART站
✨ 周边配套完善

欢迎咨询！`,
    propertyType: "studio",
    apartmentType: "Studio公寓",
    city: "San Francisco",
    country: "United States",
    address: "123 Market St, San Francisco, CA 94105",
    postcode: "94105",
    latitude: "37.7749",
    longitude: "-122.4194",
    price: "2600",
    currency: "USD",
    availableFrom: "2026-02-15",
    availableTo: "2027-02-14",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: true,
    amenities: [
      "有电梯",
      "有空调",
      "有前台",
      "有健身房"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        title: "Living Area",
        description: "Cozy studio apartment"
      },
      {
        url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80",
        title: "Kitchen",
        description: "Compact kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        title: "City View",
        description: "San Francisco skyline"
      }
    ],
    isVip: false,
    isVerified: true,
    isStudentCertified: false,
    publishedAt: "2026-01-24T14:00:00Z",
    viewCount: 67,
    status: "active"
  },
  // 新增房源 - 芝加哥1B1B
  {
    id: "chicago-1b1b-downtown",
    title: "Chicago 1B1B - Loop Area",
    listingNumber: "CH10001",
    description: `芝加哥市中心Loop区一室一卫公寓，地理位置优越。

【房源亮点】
✨ 全新装修
✨ 湖景视野
✨ 健身房、游泳池
✨ 靠近芝加哥大学、西北大学
✨ 交通便利

欢迎预约看房！`,
    propertyType: "1b1b",
    apartmentType: "市中心公寓",
    city: "Chicago",
    country: "United States",
    address: "200 N Michigan Ave, Chicago, IL 60601",
    postcode: "60601",
    latitude: "41.8781",
    longitude: "-87.6298",
    price: "2100",
    currency: "USD",
    availableFrom: "2026-02-20",
    availableTo: "2027-02-19",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有空调",
      "有阳台",
      "有前台",
      "有健身房",
      "有游泳池"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        title: "Living Room",
        description: "Elegant living space"
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
        title: "Bedroom",
        description: "Comfortable bedroom"
      }
    ],
    isVip: false,
    isVerified: true,
    isStudentCertified: true,
    publishedAt: "2026-01-23T10:00:00Z",
    viewCount: 123,
    status: "active"
  },
  // 新增房源 - 西雅图2B2B
  {
    id: "seattle-2b2b-downtown",
    title: "Seattle 2B2B - Capitol Hill",
    listingNumber: "SE10001",
    description: `西雅图Capitol Hill区域两室两卫公寓，生活便利。

【房源亮点】
✨ 现代装修
✨ 步行可达轻轨站
✨ 健身房
✨ 靠近华盛顿大学
✨ 周边餐饮丰富

欢迎咨询！`,
    propertyType: "2b2b",
    apartmentType: "社区公寓",
    city: "Seattle",
    country: "United States",
    address: "500 E Pike St, Seattle, WA 98122",
    postcode: "98122",
    latitude: "47.6062",
    longitude: "-122.3321",
    price: "2800",
    currency: "USD",
    availableFrom: "2026-03-01",
    availableTo: "2027-02-28",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有空调",
      "有前台",
      "有独立洗衣机",
      "有独立烘干机",
      "有健身房"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80",
        title: "Bedroom",
        description: "Spacious bedroom"
      },
      {
        url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
        title: "Kitchen",
        description: "Modern kitchen"
      }
    ],
    isVip: false,
    isVerified: true,
    isStudentCertified: true,
    publishedAt: "2026-01-22T16:00:00Z",
    viewCount: 98,
    status: "active"
  },
  // 已租出房源 - 波士顿
  {
    id: "boston-rented-1b1b",
    title: "Boston 1B1B - Back Bay",
    listingNumber: "B10002",
    description: `波士顿Back Bay区域一室一卫公寓（已租出）。`,
    propertyType: "1b1b",
    apartmentType: "市中心公寓",
    city: "Boston",
    country: "United States",
    address: "300 Boylston St, Boston, MA 02116",
    postcode: "02116",
    latitude: "42.3501",
    longitude: "-71.0753",
    price: "2400",
    currency: "USD",
    availableFrom: "2026-01-01",
    availableTo: "2026-12-31",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: false,
    amenities: [
      "有电梯",
      "有前台",
      "有健身房"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&q=80",
        title: "Living Room",
        description: "Living area"
      }
    ],
    isVip: false,
    isVerified: true,
    isStudentCertified: false,
    publishedAt: "2026-01-26T10:00:00Z",
    viewCount: 178,
    status: "rented"
  },
  // 已租出房源 - 洛杉矶（超过一周，应被过滤）
  {
    id: "la-rented-old-studio",
    title: "Los Angeles Studio - Old Listing",
    listingNumber: "LA10002",
    description: `洛杉矶Studio（已租出超过一周）。`,
    propertyType: "studio",
    apartmentType: "Studio",
    city: "Los Angeles",
    country: "United States",
    address: "456 S Spring St, Los Angeles, CA 90013",
    postcode: "90013",
    latitude: "34.0407",
    longitude: "-118.2468",
    price: "2200",
    currency: "USD",
    availableFrom: "2025-12-01",
    availableTo: "2026-11-30",
    minRentalPeriod: 12,
    furnished: true,
    billsIncluded: true,
    amenities: [
      "有电梯",
      "有前台"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        title: "Studio",
        description: "Studio apartment"
      }
    ],
    isVip: false,
    isVerified: false,
    isStudentCertified: false,
    publishedAt: "2026-01-20T10:00:00Z",
    viewCount: 245,
    status: "rented"
  }
];
