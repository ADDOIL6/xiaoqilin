# Contentful 房源字段配置指南

本文档详细说明了在 Contentful 中配置房源（Listing）内容类型时所需的所有字段及其可选值。

## 内容类型：Listing

### 基础信息字段

#### 1. title (标题)
- **字段类型**: Short Text
- **必填**: 是
- **说明**: 房源标题，建议格式："城市 + 房型 + 特色"
- **示例**: "Boston Luxury Apartment - Downtown Seaport"

#### 2. listingNumber (房源编号)
- **字段类型**: Short Text
- **必填**: 否
- **说明**: 房源唯一编号，用于管理和追踪
- **示例**: "B10001", "LA10001"

#### 3. description (描述)
- **字段类型**: Long Text
- **必填**: 是
- **说明**: 房源详细描述，支持多行文本
- **建议包含**: 房源亮点、交通便利性、周边配套

#### 4. propertyType (房型)
- **字段类型**: Short Text (Dropdown)
- **必填**: 是
- **可选值**:
  - `studio` - 整租套间(Studio)
  - `1b1b` - 1室1卫
  - `2b2b` - 2室2卫
  - `3b3b` - 3室3卫
  - `4b4b` - 4室4卫及以上
  - `other` - 其他

#### 5. apartmentType (公寓类型)
- **字段类型**: Short Text (Dropdown)
- **必填**: 否
- **可选值**:
  - `豪华公寓`
  - `高端公寓`
  - `市中心公寓`
  - `学生公寓`
  - `社区公寓`
  - `Studio公寓`
  - `Townhouse`
  - `独立屋`
- **说明**: 显示在房源卡片左上角

### 地理位置字段

#### 6. country (国家)
- **字段类型**: Short Text (Dropdown)
- **必填**: 是
- **可选值**:
  - `United Kingdom` - 英国
  - `United States` - 美国
  - `Canada` - 加拿大
  - `Australia` - 澳洲
  - `Singapore` - 新加坡

#### 7. city (城市)
- **字段类型**: Short Text
- **必填**: 是
- **说明**: 使用英文城市名，必须与 regions.ts 中的城市名称一致
- **示例**: "London", "Boston", "Los Angeles", "Toronto"

#### 8. address (地址)
- **字段类型**: Short Text
- **必填**: 是
- **说明**: 完整街道地址
- **示例**: "100 Seaport Blvd, Boston, MA 02210"

#### 9. postcode (邮编)
- **字段类型**: Short Text
- **必填**: 否
- **示例**: "02210", "EC2M 7PY"

#### 10. latitude (纬度)
- **字段类型**: Short Text
- **必填**: 否
- **说明**: 用于地图显示
- **示例**: "42.3501"

#### 11. longitude (经度)
- **字段类型**: Short Text
- **必填**: 否
- **说明**: 用于地图显示
- **示例**: "-71.0453"

### 价格与租期字段

#### 12. price (价格)
- **字段类型**: Short Text
- **必填**: 是
- **说明**: 月租金，仅数字
- **示例**: "2800"

#### 13. currency (货币)
- **字段类型**: Short Text (Dropdown)
- **必填**: 是
- **可选值**:
  - `USD` - 美元
  - `GBP` - 英镑
  - `CAD` - 加元
  - `AUD` - 澳元
  - `SGD` - 新加坡元

#### 14. availableFrom (起租日期)
- **字段类型**: Date and Time
- **必填**: 是
- **说明**: 房源可入住日期

#### 15. availableTo (结束日期)
- **字段类型**: Date and Time
- **必填**: 否
- **说明**: 租期结束日期

#### 16. minRentalPeriod (最短租期)
- **字段类型**: Integer
- **必填**: 否
- **说明**: 最短租期（月数）
- **示例**: 12

### 房源特性字段

#### 17. furnished (是否配家具)
- **字段类型**: Boolean
- **必填**: 是
- **默认值**: false

#### 18. billsIncluded (是否包含账单)
- **字段类型**: Boolean
- **必填**: 是
- **默认值**: false

#### 19. amenities (设施列表)
- **字段类型**: JSON Object 或 Long Text
- **必填**: 否
- **可选值**:
  - `有电梯`
  - `有空调`
  - `有阳台`
  - `有前台`
  - `带停车位`
  - `有独立洗衣机`
  - `有地暖`
  - `有独立烘干机`
  - `有健身房`
  - `有游泳池`
  - `有屋顶花园`
  - `允许养宠物`
  - `有门禁系统`
  - `24小时保安`
- **格式**: JSON数组字符串
- **示例**: `["有电梯", "有空调", "有阳台"]`

### 媒体字段

#### 20. images (图片)
- **字段类型**: Media (Multiple)
- **必填**: 是
- **说明**: 房源图片，建议上传3-6张
- **建议顺序**:
  1. 客厅
  2. 卧室
  3. 厨房
  4. 浴室
  5. 外观/景观

#### 21. videoUrl (视频链接)
- **字段类型**: Short Text
- **必填**: 否
- **说明**: 房源视频URL

#### 22. hasVideo (是否有视频)
- **字段类型**: Boolean
- **必填**: 否
- **默认值**: false

### 标识与认证字段

#### 23. isVip (VIP置顶)
- **字段类型**: Boolean
- **必填**: 否
- **默认值**: false
- **说明**: 设置为true后，房源卡片左上角会显示"VIP置顶"标签（橙色）

#### 24. isVerified (已认证)
- **字段类型**: Boolean
- **必填**: 否
- **默认值**: false
- **说明**: 房源是否经过平台认证

#### 25. isStudentCertified (学生认证)
- **字段类型**: Boolean
- **必填**: 否
- **默认值**: false
- **说明**: 设置为true后，房源卡片左上角会显示"学生认证"标签（绿色）

### 状态与统计字段

#### 26. status (状态)
- **字段类型**: Short Text (Dropdown)
- **必填**: 是
- **可选值**:
  - `active` - 活跃（正在出租）
  - `rented` - 已租出
  - `inactive` - 已下架
- **说明**: 
  - `active`: 正常显示在房源列表中
  - `rented`: 显示"Rented 已租出"遮罩层，超过一周自动隐藏
  - `inactive`: 不在列表中显示

#### 27. publishedAt (发布时间)
- **字段类型**: Date and Time
- **必填**: 是
- **说明**: 用于排序，发布时间越新越靠前

#### 28. viewCount (浏览次数)
- **字段类型**: Integer
- **必填**: 否
- **默认值**: 0
- **说明**: 房源浏览次数统计

---

## 房源卡片显示规则

### 左上角标签显示优先级（从左到右）：
1. **房型标签**（蓝色，必显示）: Studio / 1b1b / 2b2b / 3b3b / 4b4b+
2. **VIP置顶**（橙色）: 当 `isVip = true` 时显示
3. **学生认证**（绿色）: 当 `isStudentCertified = true` 时显示

### 已租出房源显示规则：
- 当 `status = "rented"` 时，封面显示半透明黑色遮罩
- 遮罩中央显示"Rented 已租出"标签（红色）
- 已租出超过一周（以 `publishedAt` 计算）的房源不在列表中显示
- 页面底部提示："已租出超一周房源为保障用户隐私不予展示"

### 排序规则：
1. 活跃房源（`status = "active"`）按 `publishedAt` 降序排列
2. 已租出房源（`status = "rented"`）排在活跃房源之后
3. 已租出超过一周的房源被过滤掉

---

## Contentful 配置步骤

### 1. 创建 Content Model
1. 登录 Contentful
2. 进入 Content model
3. 点击 "Add content type"
4. 名称设为 "Listing"
5. API Identifier 设为 "listing"

### 2. 添加字段
按照上述字段列表逐一添加字段，注意：
- 字段名称必须与 API Identifier 完全一致
- Dropdown 字段需要手动添加所有可选值
- Boolean 字段设置合适的默认值
- Media 字段选择 "Many files"

### 3. 发布 Content Model
完成字段配置后，点击 "Save" 并 "Publish"

### 4. 创建房源内容
1. 进入 Content
2. 点击 "Add entry"
3. 选择 "Listing"
4. 填写所有必填字段
5. 上传图片
6. 设置标识字段（isVip, isStudentCertified）
7. 选择状态（status）
8. 点击 "Publish"

---

## 注意事项

1. **城市名称一致性**: `city` 字段必须使用英文名称，且与 `client/src/data/regions.ts` 中定义的城市名称完全一致
2. **图片优化**: 建议上传高质量图片，Contentful 会自动优化
3. **已租出房源管理**: 房源租出后，将 `status` 改为 `rented`，系统会自动处理显示逻辑
4. **VIP和认证标签**: 这些标签会影响房源的展示效果，请谨慎使用
5. **价格格式**: `price` 字段只填写数字，不要包含货币符号
6. **日期格式**: 所有日期字段使用 ISO 8601 格式

---

## 示例房源配置

```json
{
  "title": "Boston Luxury Apartment - Downtown Seaport",
  "listingNumber": "B10001",
  "description": "位于波士顿海港区的豪华公寓...",
  "propertyType": "2b2b",
  "apartmentType": "豪华公寓",
  "country": "United States",
  "city": "Boston",
  "address": "100 Seaport Blvd, Boston, MA 02210",
  "postcode": "02210",
  "latitude": "42.3501",
  "longitude": "-71.0453",
  "price": "2800",
  "currency": "USD",
  "availableFrom": "2026-02-01T00:00:00Z",
  "availableTo": "2027-01-31T00:00:00Z",
  "minRentalPeriod": 12,
  "furnished": true,
  "billsIncluded": false,
  "amenities": "[\"有电梯\",\"有空调\",\"有阳台\",\"有前台\",\"带停车位\",\"有健身房\",\"有游泳池\"]",
  "images": [多个图片资源],
  "videoUrl": "https://example.com/video.mp4",
  "hasVideo": true,
  "isVip": true,
  "isVerified": true,
  "isStudentCertified": true,
  "status": "active",
  "publishedAt": "2026-01-24T10:00:00Z",
  "viewCount": 156
}
```

---

## 技术支持

如有任何问题，请参考：
- Contentful 官方文档: https://www.contentful.com/developers/docs/
- 项目代码: `/server/contentful.ts`
- Mock 数据示例: `/server/contentful-mock.ts`
