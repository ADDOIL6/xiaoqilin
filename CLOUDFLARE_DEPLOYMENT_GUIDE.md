# Cloudflare部署完整教程

## 目录
1. [准备工作](#准备工作)
2. [第一步：创建Cloudflare账号](#第一步创建cloudflare账号)
3. [第二步：创建KV命名空间](#第二步创建kv命名空间)
4. [第三步：部署Cloudflare Workers API](#第三步部署cloudflare-workers-api)
5. [第四步：上传房源数据到KV](#第四步上传房源数据到kv)
6. [第五步：部署前端到Cloudflare Pages](#第五步部署前端到cloudflare-pages)
7. [第六步：配置环境变量](#第六步配置环境变量)
8. [第七步：测试和验证](#第七步测试和验证)
9. [常见问题](#常见问题)

---

## 准备工作

### 需要的工具
- [x] Cloudflare账号（免费）
- [x] Git（用于代码管理）
- [x] Node.js 18+（本地测试）
- [x] pnpm（包管理器）

### 项目文件结构
```
xiaoqilin_final_deploy/
├── client/              # 前端代码（部署到Pages）
├── workers/             # Workers API代码
│   ├── api.js          # API主文件
│   ├── wrangler.toml   # Workers配置
│   └── init-kv-data.js # KV数据初始化
└── CLOUDFLARE_DEPLOYMENT_GUIDE.md  # 本文档
```

---

## 第一步：创建Cloudflare账号

### 1.1 注册账号

访问 https://dash.cloudflare.com/sign-up

填写信息：
- **邮箱：** 你的邮箱地址
- **密码：** 设置一个强密码

点击 **Create Account** 创建账号

### 1.2 验证邮箱

打开邮箱，点击验证链接

### 1.3 登录Dashboard

访问 https://dash.cloudflare.com/

---

## 第二步：创建KV命名空间

### 2.1 进入Workers & Pages

在Cloudflare Dashboard左侧菜单，点击 **Workers & Pages**

### 2.2 创建第一个KV命名空间（房源数据）

1. 点击顶部 **KV** 标签
2. 点击 **Create a namespace** 按钮
3. 填写命名空间名称：

```
xiaoqilin-listings
```

4. 点击 **Add** 创建
5. **记录KV ID**（稍后需要用到）

复制这段ID：
```
示例：a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2.3 创建第二个KV命名空间（浏览计数）

重复上述步骤，创建第二个命名空间：

命名空间名称：
```
xiaoqilin-view-count
```

同样**记录KV ID**

---

## 第三步：部署Cloudflare Workers API

### 3.1 安装Wrangler CLI

打开终端，运行：

```bash
npm install -g wrangler
```

### 3.2 登录Cloudflare

```bash
wrangler login
```

浏览器会自动打开，点击 **Allow** 授权

### 3.3 配置wrangler.toml

打开 `workers/wrangler.toml` 文件，替换KV ID：

```toml
name = "xiaoqilin-api"
main = "api.js"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "LISTINGS_KV"
id = "替换为第一个KV的ID"

[[kv_namespaces]]
binding = "VIEW_COUNT_KV"
id = "替换为第二个KV的ID"
```

**复制粘贴用（替换ID后使用）：**

```toml
name = "xiaoqilin-api"
main = "api.js"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "LISTINGS_KV"
id = "YOUR_LISTINGS_KV_ID_HERE"

[[kv_namespaces]]
binding = "VIEW_COUNT_KV"
id = "YOUR_VIEW_COUNT_KV_ID_HERE"
```

### 3.4 部署Workers

进入workers目录：

```bash
cd workers
```

部署：

```bash
wrangler deploy
```

部署成功后，会显示Workers URL，例如：
```
https://xiaoqilin-api.YOUR_SUBDOMAIN.workers.dev
```

**记录这个URL**，稍后需要配置到前端环境变量中

---

## 第四步：上传房源数据到KV

### 4.1 准备数据文件

打开 `workers/init-kv-data.js`，这是所有房源数据

### 4.2 上传所有房源列表

在Cloudflare Dashboard中：

1. 进入 **Workers & Pages** > **KV**
2. 点击 `xiaoqilin-listings` 命名空间
3. 点击 **Add entry** 按钮
4. 填写：

**Key:**
```
all_listings
```

**Value:** 复制以下JSON（完整房源数据）

```json
[{"id":"la-luxury-2b2b","title":"Los Angeles Luxury Apartment","city":"Los Angeles","cityEn":"Los Angeles","country":"美国","countryEn":"United States","price":3200,"priceUnit":"周","bedrooms":2,"bathrooms":2,"propertyType":"2b2b","images":["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],"description":"位于洛杉矶市中心的豪华公寓，交通便利，设施齐全。","address":"456 Sunset Blvd, Los Angeles, CA 90028","latitude":34.0522,"longitude":-118.2437,"availableFrom":"2026/02/15","availableTo":"2027/02/14","tags":["VIP置顶","学生认证","实拍房源"],"isRented":false,"publishedAt":"2026-01-24T10:00:00Z"},{"id":"sf-studio-downtown","title":"San Francisco Studio - Financial District","city":"San Francisco","cityEn":"San Francisco","country":"美国","countryEn":"United States","price":2600,"priceUnit":"周","bedrooms":0,"bathrooms":1,"propertyType":"Studio","images":["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800","https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],"description":"旧金山金融区全新Studio公寓，交通便利。","address":"123 Market St, San Francisco, CA 94105","latitude":37.7749,"longitude":-122.4194,"availableFrom":"2026/02/15","availableTo":"2027/02/14","tags":["实拍房源"],"isRented":false,"publishedAt":"2026-01-24T10:00:00Z"},{"id":"boston-luxury-apartment","title":"Boston Luxury Apartment","city":"Boston","cityEn":"Boston","country":"美国","countryEn":"United States","price":2800,"priceUnit":"周","bedrooms":2,"bathrooms":2,"propertyType":"2b2b","images":["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800","https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],"description":"波士顿Seaport区域豪华公寓，海景房。","address":"789 Seaport Blvd, Boston, MA 02210","latitude":42.3601,"longitude":-71.0589,"availableFrom":"2026/03/01","availableTo":"2027/02/28","tags":["VIP置顶","学生认证"],"isRented":false,"publishedAt":"2026-01-25T10:00:00Z"},{"id":"chicago-downtown-1b1b","title":"Chicago Downtown 1B1B","city":"Chicago","cityEn":"Chicago","country":"美国","countryEn":"United States","price":2200,"priceUnit":"周","bedrooms":1,"bathrooms":1,"propertyType":"1b1b","images":["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],"description":"芝加哥市中心现代公寓，靠近地铁站。","address":"321 Michigan Ave, Chicago, IL 60601","latitude":41.8781,"longitude":-87.6298,"availableFrom":"2026/02/20","availableTo":"2026/12/31","tags":["学生认证"],"isRented":false,"publishedAt":"2026-01-25T11:00:00Z"},{"id":"seattle-modern-2b2b","title":"Seattle Modern Apartment","city":"Seattle","cityEn":"Seattle","country":"美国","countryEn":"United States","price":2900,"priceUnit":"周","bedrooms":2,"bathrooms":2,"propertyType":"2b2b","images":["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],"description":"西雅图Capitol Hill区域现代公寓。","address":"555 Broadway E, Seattle, WA 98102","latitude":47.6062,"longitude":-122.3321,"availableFrom":"2026/03/15","availableTo":"2027/03/14","tags":["学生认证","实拍房源"],"isRented":false,"publishedAt":"2026-01-25T12:00:00Z"},{"id":"nyc-manhattan-1b1b","title":"New York Manhattan 1B1B","city":"New York","cityEn":"New York","country":"美国","countryEn":"United States","price":3500,"priceUnit":"周","bedrooms":1,"bathrooms":1,"propertyType":"1b1b","images":["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],"description":"纽约曼哈顿中城公寓，交通便利。","address":"888 8th Ave, New York, NY 10019","latitude":40.758,"longitude":-73.9855,"availableFrom":"2026/04/01","availableTo":"2027/03/31","tags":["VIP置顶"],"isRented":false,"publishedAt":"2026-01-26T10:00:00Z"},{"id":"boston-back-bay-rented","title":"Boston 1B1B - Back Bay","city":"Boston","cityEn":"Boston","country":"美国","countryEn":"United States","price":2400,"priceUnit":"周","bedrooms":1,"bathrooms":1,"propertyType":"1b1b","images":["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],"description":"波士顿Back Bay区域公寓（已租出）。","address":"100 Boylston St, Boston, MA 02116","latitude":42.3505,"longitude":-71.0764,"availableFrom":"2026/01/15","availableTo":"2026/12/31","tags":[],"isRented":true,"rentedAt":"2026-01-20T10:00:00Z","publishedAt":"2026-01-15T10:00:00Z"},{"id":"manchester-city-centre","title":"Manchester City Centre Apartment","city":"Manchester","cityEn":"Manchester","country":"英国","countryEn":"United Kingdom","price":1800,"priceUnit":"周","bedrooms":1,"bathrooms":1,"propertyType":"1b1b","images":["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],"description":"曼彻斯特市中心现代公寓。","address":"50 Deansgate, Manchester M3 2EG, UK","latitude":53.4808,"longitude":-2.2426,"availableFrom":"2026/03/01","availableTo":"2027/02/28","tags":["实拍房源"],"isRented":false,"publishedAt":"2026-01-20T10:00:00Z"},{"id":"london-zone1-studio","title":"London Zone 1 Studio","city":"London","cityEn":"London","country":"英国","countryEn":"United Kingdom","price":2200,"priceUnit":"周","bedrooms":0,"bathrooms":1,"propertyType":"Studio","images":["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],"description":"伦敦一区Studio公寓，交通便利。","address":"25 Baker St, London W1U 8ED, UK","latitude":51.5194,"longitude":-0.157,"availableFrom":"2026/02/15","availableTo":"2026/08/31","tags":["VIP置顶"],"isRented":false,"publishedAt":"2026-01-22T10:00:00Z"},{"id":"toronto-downtown-2b2b","title":"Toronto Downtown 2B2B","city":"Toronto","cityEn":"Toronto","country":"加拿大","countryEn":"Canada","price":2600,"priceUnit":"周","bedrooms":2,"bathrooms":2,"propertyType":"2b2b","images":["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],"description":"多伦多市中心豪华公寓。","address":"100 King St W, Toronto, ON M5X 1A9, Canada","latitude":43.6532,"longitude":-79.3832,"availableFrom":"2026/03/01","availableTo":"2027/02/28","tags":["学生认证"],"isRented":false,"publishedAt":"2026-01-23T10:00:00Z"}]
```

5. 点击 **Add** 保存

### 4.3 上传单个房源详情（可选）

如果需要单独存储每个房源的详情（推荐），重复上述步骤，为每个房源创建一个entry：

**示例 - Los Angeles房源：**

Key:
```
listing_la-luxury-2b2b
```

Value:
```json
{"id":"la-luxury-2b2b","title":"Los Angeles Luxury Apartment","city":"Los Angeles","cityEn":"Los Angeles","country":"美国","countryEn":"United States","price":3200,"priceUnit":"周","bedrooms":2,"bathrooms":2,"propertyType":"2b2b","images":["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],"description":"位于洛杉矶市中心的豪华公寓，交通便利，设施齐全。","address":"456 Sunset Blvd, Los Angeles, CA 90028","latitude":34.0522,"longitude":-118.2437,"availableFrom":"2026/02/15","availableTo":"2027/02/14","tags":["VIP置顶","学生认证","实拍房源"],"isRented":false,"publishedAt":"2026-01-24T10:00:00Z"}
```

**提示：** 为节省时间，可以只上传 `all_listings`，Workers API会自动从中筛选

---

## 第五步：部署前端到Cloudflare Pages

### 5.1 创建GitHub仓库（推荐）

1. 访问 https://github.com/new
2. 创建新仓库，命名为 `xiaoqilin-rental`
3. 设置为 **Private**（私有）
4. 点击 **Create repository**

### 5.2 上传代码到GitHub

在项目根目录运行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/xiaoqilin-rental.git
git push -u origin main
```

**替换 `YOUR_USERNAME` 为你的GitHub用户名**

### 5.3 连接Cloudflare Pages

1. 在Cloudflare Dashboard，进入 **Workers & Pages**
2. 点击 **Create application** 按钮
3. 选择 **Pages** 标签
4. 点击 **Connect to Git**
5. 选择 **GitHub**，授权Cloudflare访问你的GitHub
6. 选择 `xiaoqilin-rental` 仓库
7. 点击 **Begin setup**

### 5.4 配置构建设置

填写以下信息：

**Project name:**
```
xiaoqilin-rental
```

**Production branch:**
```
main
```

**Framework preset:**
```
None
```

**Build command:**
```
cd client && pnpm install && pnpm build
```

**Build output directory:**
```
client/dist
```

**Root directory:**
```
/
```

**Environment variables (构建时):**

添加以下环境变量：

| 变量名 | 值 |
|--------|-----|
| `NODE_VERSION` | `18` |
| `VITE_MAPBOX_TOKEN` | `pk.eyJ1IjoiMXZlYjYiLCJhIjoiY21sNHhhdWFwMDBsODNncHU5Z3RtNGZsciJ9.Yrl4KD7r-C5IiTZwf89e9g` |
| `VITE_API_URL` | `https://xiaoqilin-api.YOUR_SUBDOMAIN.workers.dev` |

**注意：** 将 `YOUR_SUBDOMAIN` 替换为第三步中记录的Workers URL

### 5.5 开始部署

点击 **Save and Deploy** 按钮

等待3-5分钟，部署完成后会显示网站URL：
```
https://xiaoqilin-rental.pages.dev
```

---

## 第六步：配置环境变量

### 6.1 在Cloudflare Pages中设置环境变量

1. 在Pages项目页面，点击 **Settings** 标签
2. 点击左侧 **Environment variables**
3. 添加以下变量（Production环境）：

**复制粘贴用：**

| 变量名 | 值 |
|--------|-----|
| `VITE_MAPBOX_TOKEN` | `pk.eyJ1IjoiMXZlYjYiLCJhIjoiY21sNHhhdWFwMDBsODNncHU5Z3RtNGZsciJ9.Yrl4KD7r-C5IiTZwf89e9g` |
| `VITE_API_URL` | `https://xiaoqilin-api.YOUR_SUBDOMAIN.workers.dev` |

4. 点击 **Save** 保存

### 6.2 重新部署

环境变量修改后需要重新部署：

1. 进入 **Deployments** 标签
2. 点击最新部署右侧的 **···** 菜单
3. 选择 **Retry deployment**

---

## 第七步：测试和验证

### 7.1 测试前端页面

访问你的Pages URL：
```
https://xiaoqilin-rental.pages.dev
```

检查：
- [x] 首页正常加载
- [x] 城市选择器工作正常
- [x] 房源列表显示

### 7.2 测试Workers API

在浏览器中访问：
```
https://xiaoqilin-api.YOUR_SUBDOMAIN.workers.dev/api/listings
```

应该返回JSON格式的房源列表

### 7.3 测试浏览计数

1. 打开任意房源详情页
2. 查看页面中的"浏览次数"
3. 刷新页面，浏览次数应该增加

### 7.4 测试地图功能

1. 进入房源详情页
2. 向下滚动到地图部分
3. 检查Mapbox地图是否正常显示

---

## 常见问题

### Q1: Workers部署失败

**错误：** `Error: KV namespace not found`

**解决：** 检查 `wrangler.toml` 中的KV ID是否正确

### Q2: 前端无法获取房源数据

**错误：** `Failed to fetch listings`

**解决：**
1. 检查 `VITE_API_URL` 环境变量是否正确
2. 确认Workers已成功部署
3. 检查浏览器控制台的CORS错误

### Q3: 地图不显示

**错误：** 地图区域空白

**解决：**
1. 检查 `VITE_MAPBOX_TOKEN` 是否正确
2. 确认Mapbox Token有效
3. 查看浏览器控制台错误信息

### Q4: 浏览计数不增加

**解决：**
1. 检查VIEW_COUNT_KV命名空间是否创建
2. 确认Workers API中的KV绑定正确
3. 查看Workers日志（Dashboard > Workers > Logs）

### Q5: 构建失败

**错误：** `Build failed`

**解决：**
1. 检查 `NODE_VERSION` 环境变量是否设置为 `18`
2. 确认构建命令正确
3. 查看构建日志中的详细错误信息

---

## 下一步

### 绑定自定义域名

1. 在Pages项目中，点击 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入你的域名（如 `www.xiaoqilin.com`）
4. 按照提示添加DNS记录

### 配置HTTPS

Cloudflare自动为所有Pages提供免费SSL证书

### 监控和分析

1. 在Dashboard中查看 **Analytics** 标签
2. 监控访问量、请求次数等数据

---

## 总结

恭喜！你已经成功将小麒麟转租通部署到Cloudflare！

**部署架构：**
- ✅ 前端：Cloudflare Pages
- ✅ API：Cloudflare Workers
- ✅ 存储：Cloudflare KV
- ✅ 地图：Mapbox
- ✅ 浏览计数：KV存储

**免费额度：**
- Pages：无限请求
- Workers：每天100,000次请求
- KV：每天100,000次读取，1,000次写入
- Mapbox：每月50,000次地图加载

**完全够用！** 🎉
