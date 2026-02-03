// 求租信息 Mock 数据

export const mockRentalRequests = [
  {
    id: "rental-req-001",
    title: "求租波士顿1b1b公寓 - 近哈佛",
    description: `本人是哈佛大学研究生，寻找波士顿地区1b1b公寓。

【个人信息】
👤 女生，无宠物，不吸烟
🎓 哈佛大学在读研究生
💼 有稳定收入，信用良好

【租房要求】
🏠 房型：1b1b
📍 位置：Cambridge或Somerville，靠近红线地铁
💰 预算：$1800-2200/月
📅 入住时间：2026年3月1日
⏰ 租期：至少12个月

【期望配置】
✅ 家具齐全
✅ 有洗衣机烘干机
✅ 允许做饭
✅ 安全社区

如有合适房源，请联系！`,
    city: "Boston",
    country: "United States",
    propertyType: "1b1b",
    budget: "1800-2200",
    currency: "USD",
    moveInDate: "2026-03-01",
    minRentalPeriod: 12,
    requirements: [
      "家具齐全",
      "有洗衣机",
      "有烘干机",
      "允许做饭",
      "安全社区"
    ],
    userId: "user-001",
    userName: "小李",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoli",
    status: "active",
    createdAt: "2026-01-23T10:00:00Z",
    viewCount: 45
  },
  {
    id: "rental-req-002",
    title: "求租曼彻斯特学生公寓 - 市中心",
    description: `曼彻斯特大学学生求租，希望找到市中心的学生公寓。

【个人信息】
👤 男生，爱干净，作息规律
🎓 曼彻斯特大学本科生
🎵 喜欢音乐和运动

【租房要求】
🏠 房型：Studio或1b1b
📍 位置：市中心，步行到学校
💰 预算：£700-900/月
📅 入住时间：2026年9月1日
⏰ 租期：12个月

【期望配置】
✅ 包Bill
✅ 有网络
✅ 有暖气
✅ 交通便利

期待您的联系！`,
    city: "Manchester",
    country: "United Kingdom",
    propertyType: "studio",
    budget: "700-900",
    currency: "GBP",
    moveInDate: "2026-09-01",
    minRentalPeriod: 12,
    requirements: [
      "包Bill",
      "有网络",
      "有暖气",
      "交通便利"
    ],
    userId: "user-002",
    userName: "David",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    status: "active",
    createdAt: "2026-01-22T14:30:00Z",
    viewCount: 32
  },
  {
    id: "rental-req-003",
    title: "求租纽约曼哈顿2b2b - 情侣合租",
    description: `情侣求租曼哈顿2b2b公寓，希望找到安全舒适的居住环境。

【个人信息】
👫 情侣，都在纽约工作
💼 稳定工作，收入可观
🐱 有一只猫咪

【租房要求】
🏠 房型：2b2b
📍 位置：曼哈顿，靠近地铁
💰 预算：$3500-4500/月
📅 入住时间：2026年4月1日
⏰ 租期：至少12个月

【期望配置】
✅ 允许养宠物
✅ 有电梯
✅ 有门卫
✅ 健身房
✅ 洗衣房

欢迎房东联系！`,
    city: "New York",
    country: "United States",
    propertyType: "2b2b",
    budget: "3500-4500",
    currency: "USD",
    moveInDate: "2026-04-01",
    minRentalPeriod: 12,
    requirements: [
      "允许养宠物",
      "有电梯",
      "有门卫",
      "有健身房",
      "有洗衣房"
    ],
    userId: "user-003",
    userName: "张先生",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang",
    status: "active",
    createdAt: "2026-01-21T09:15:00Z",
    viewCount: 67
  },
  {
    id: "rental-req-004",
    title: "求租伦敦Zone 1公寓 - 金融从业者",
    description: `金融从业者求租伦敦Zone 1公寓，要求交通便利。

【个人信息】
👤 男生，金融行业
💼 在伦敦金融城工作
🏃 热爱健身和跑步

【租房要求】
🏠 房型：1b1b或2b1b
📍 位置：Zone 1，靠近地铁站
💰 预算：£1800-2500/月
📅 入住时间：2026年2月15日
⏰ 租期：至少6个月

【期望配置】
✅ 现代装修
✅ 有健身房
✅ 24小时门卫
✅ 包Bill

如有房源请联系！`,
    city: "London",
    country: "United Kingdom",
    propertyType: "1b1b",
    budget: "1800-2500",
    currency: "GBP",
    moveInDate: "2026-02-15",
    minRentalPeriod: 6,
    requirements: [
      "现代装修",
      "有健身房",
      "24小时门卫",
      "包Bill"
    ],
    userId: "user-004",
    userName: "James",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    status: "active",
    createdAt: "2026-01-20T16:45:00Z",
    viewCount: 51
  }
];
