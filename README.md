# 小麒麟全球转租通 - 完整部署包

## 📦 项目简介

小麒麟全球转租通是一个全球留学生转租求租平台，支持多国城市筛选、房源发布、求租信息等功能。

## 🎯 本次更新内容

### 城市筛选功能优化
1. ✅ 完全参考租房君(54zfj.com)的筛选逻辑
2. ✅ 补全美国所有51个州和150+个城市
3. ✅ 添加加拿大8个热门留学城市和13个城市（按省分组）
4. ✅ 优化首页和Listings页面的城市筛选体验
5. ✅ 修复筛选面板显示问题

### 国家和城市数据
- **英国**：10个热门城市 + 60+个所有城市（平铺）
- **美国**：10个热门城市 + 51个州/特区 + 150+个城市（按州分组）
- **加拿大**：8个热门留学城市 + 13个城市（按省分组）
  - 安大略省：多伦多、渥太华、滑铁卢、伦敦、金斯顿、汉密尔顿
  - 不列颠哥伦比亚省：温哥华、维多利亚、本拿比
  - 魁北克省：蒙特利尔、魁北克市
  - 艾伯塔省：卡尔加里、埃德蒙顿
- **澳洲**：7个城市（平铺）
- **新加坡**：1个城市

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- pnpm 8+
- MySQL 8.0+

### 安装步骤

1. **解压项目文件**
   ```bash
   tar -xzf xiaoqilin_complete_deploy_YYYYMMDD_HHMMSS.tar.gz
   cd xiaoqilin_final_deploy
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **配置环境变量**
   
   创建 `.env` 文件：
   ```env
   # 数据库配置
   DATABASE_URL=mysql://username:password@localhost:3306/xiaoqilin
   
   # Cloudflare配置（可选）
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   CLOUDFLARE_API_TOKEN=your_api_token
   ```

4. **初始化数据库**
   ```bash
   # 创建数据库
   mysql -u root -p -e "CREATE DATABASE xiaoqilin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   
   # 导入数据库结构（如果有SQL文件）
   mysql -u root -p xiaoqilin < database/schema.sql
   ```

5. **启动开发服务器**
   ```bash
   pnpm dev
   ```
   
   访问: http://localhost:3000

6. **构建生产版本**
   ```bash
   pnpm build
   ```

## 📁 项目结构

```
xiaoqilin_final_deploy/
├── client/                 # 前端代码
│   ├── src/
│   │   ├── components/    # React组件
│   │   │   └── CityFilter.tsx  # 城市筛选组件（已优化）
│   │   ├── data/          # 数据文件
│   │   │   └── regions.ts # 国家地区数据（已补全）
│   │   ├── pages/         # 页面组件
│   │   │   ├── Home.tsx   # 首页（已优化）
│   │   │   └── Listings.tsx # 房源列表页
│   │   └── ...
│   └── ...
├── server/                # 后端代码
│   ├── index.ts          # 服务器入口
│   └── ...
├── shared/               # 共享代码
├── package.json          # 项目依赖
├── pnpm-lock.yaml       # 依赖锁定文件
├── tsconfig.json        # TypeScript配置
├── vite.config.ts       # Vite配置
├── vitest.config.ts     # 测试配置
├── wrangler.toml        # Cloudflare配置
└── README.md            # 本文件
```

## 🔧 核心文件说明

### 1. 城市筛选组件
**文件**: `client/src/components/CityFilter.tsx`

**功能**:
- 热门城市快捷选择
- 国家标签切换（英国、美国、加拿大、澳洲、新加坡）
- 城市列表（平铺或按州/省分组）
- 字母索引快速定位
- 遮罩层交互

### 2. 国家地区数据
**文件**: `client/src/data/regions.ts`

**数据结构**:
```typescript
export interface City {
  name: string;      // 中文名
  nameEn: string;    // 英文名
}

export interface State {
  name: string;      // 州/省中文名
  nameEn: string;    // 州/省英文名
  cities: City[];    // 城市列表
}

export interface Country {
  name: string;           // 国家中文名
  nameEn: string;         // 国家英文名
  hotCities: City[];      // 热门城市
  cities?: City[];        // 所有城市（平铺）
  states?: State[];       // 州/省分组
  letterIndex: string[];  // 字母索引
}
```

## 🌐 部署到生产环境

### 部署到Cloudflare Pages

1. **登录Cloudflare Dashboard**
   访问: https://dash.cloudflare.com

2. **创建新项目**
   - Pages -> Create a project
   - Connect to Git 或 Direct Upload

3. **配置构建设置**
   ```
   Build command: pnpm build
   Build output directory: dist
   ```

4. **设置环境变量**
   在Cloudflare Pages设置中添加环境变量

5. **部署**
   ```bash
   pnpm run deploy
   ```

### 部署到其他平台

项目支持部署到任何支持Node.js的平台：
- Vercel
- Netlify
- AWS
- 阿里云
- 腾讯云

## 📝 开发说明

### 修改城市数据

编辑 `client/src/data/regions.ts` 文件，按照现有格式添加或修改城市数据。

### 修改筛选组件样式

编辑 `client/src/components/CityFilter.tsx` 文件，使用Tailwind CSS类名修改样式。

### 添加新功能

1. 在 `client/src/components/` 创建新组件
2. 在 `client/src/pages/` 创建新页面
3. 在 `server/` 添加新的API端点

## 🐛 常见问题

### Q: 安装依赖失败
A: 确保使用pnpm而不是npm或yarn：
```bash
npm install -g pnpm
pnpm install
```

### Q: 数据库连接失败
A: 检查 `.env` 文件中的数据库配置是否正确

### Q: 首页筛选面板显示不全
A: 已修复，确保使用最新的 `CityFilter.tsx` 和 `Home.tsx` 文件

### Q: 城市选择后没有反应
A: 已修复事件冒泡问题，确保使用最新的代码

## 📞 技术支持

如有问题，请联系开发团队或查看项目文档。

## 📄 许可证

本项目为小麒麟转租通所有。

---

**最后更新**: 2026年1月24日
**版本**: v2.0.0
**包含功能**: 完整的城市筛选系统，参考租房君设计
