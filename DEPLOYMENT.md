# 快速部署指南

## 🚀 5分钟快速部署

### 方法1: 本地开发环境

```bash
# 1. 解压文件
tar -xzf xiaoqilin_complete_deploy_*.tar.gz
cd xiaoqilin_final_deploy

# 2. 安装pnpm（如果没有）
npm install -g pnpm

# 3. 安装依赖
pnpm install

# 4. 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

### 方法2: 生产环境部署

```bash
# 1-3步同上

# 4. 构建生产版本
pnpm build

# 5. 启动生产服务器
pnpm start
```

## 🔧 环境配置

### 必需配置

创建 `.env` 文件：

```env
# 数据库（必需）
DATABASE_URL=mysql://user:password@localhost:3306/xiaoqilin

# 服务器端口（可选，默认3000）
PORT=3000
```

### 可选配置

```env
# Cloudflare（用于Cloudflare Pages部署）
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# 其他配置
NODE_ENV=production
```

## 📦 数据库设置

### MySQL设置

```bash
# 创建数据库
mysql -u root -p
```

```sql
CREATE DATABASE xiaoqilin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'xiaoqilin'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON xiaoqilin.* TO 'xiaoqilin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 导入数据（如果有）

```bash
mysql -u xiaoqilin -p xiaoqilin < database/schema.sql
```

## 🌐 部署到云平台

### Cloudflare Pages

```bash
# 1. 登录Cloudflare
pnpm wrangler login

# 2. 部署
pnpm run deploy
```

### Vercel

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 部署
vercel
```

### Netlify

```bash
# 1. 安装Netlify CLI
npm install -g netlify-cli

# 2. 部署
netlify deploy --prod
```

## ✅ 验证部署

访问以下页面确认部署成功：

1. **首页**: `/`
   - 检查城市筛选功能
   - 点击"选择城市"按钮
   - 切换国家标签
   - 选择城市

2. **房源列表**: `/listings`
   - 检查城市筛选功能
   - 查看房源列表

3. **房源详情**: `/listings/:id`
   - 查看房源详细信息

## 🐛 故障排除

### 问题1: 端口被占用

```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或使用其他端口
PORT=3001 pnpm dev
```

### 问题2: 依赖安装失败

```bash
# 清理缓存
pnpm store prune

# 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 问题3: 数据库连接失败

```bash
# 检查MySQL是否运行
sudo systemctl status mysql

# 启动MySQL
sudo systemctl start mysql

# 测试连接
mysql -u xiaoqilin -p
```

## 📊 性能优化

### 生产环境优化

```bash
# 1. 构建优化版本
pnpm build

# 2. 启用压缩
# 在nginx配置中启用gzip

# 3. 启用CDN
# 将静态资源部署到CDN
```

### 数据库优化

```sql
-- 添加索引
CREATE INDEX idx_city ON listings(city);
CREATE INDEX idx_created_at ON listings(created_at);

-- 优化查询
ANALYZE TABLE listings;
```

## 🔒 安全配置

### 生产环境安全检查

1. ✅ 设置强密码
2. ✅ 启用HTTPS
3. ✅ 配置CORS
4. ✅ 启用防火墙
5. ✅ 定期备份数据库

### 环境变量安全

```bash
# 不要将.env文件提交到Git
echo ".env" >> .gitignore

# 使用环境变量管理敏感信息
export DATABASE_URL="mysql://..."
```

## 📈 监控和日志

### 启用日志

```bash
# 开发环境
pnpm dev | tee logs/dev.log

# 生产环境
pnpm start | tee logs/prod.log
```

### 监控工具

- **PM2**: 进程管理
  ```bash
  npm install -g pm2
  pm2 start pnpm --name xiaoqilin -- start
  pm2 monit
  ```

- **Nginx**: 反向代理和负载均衡

## 🎉 部署完成

部署成功后，您的网站应该可以正常访问了！

**测试清单**:
- [ ] 首页加载正常
- [ ] 城市筛选功能正常
- [ ] 房源列表显示正常
- [ ] 房源详情页正常
- [ ] 数据库连接正常
- [ ] 所有API端点正常

---

**需要帮助？** 请查看 README.md 或联系技术支持。
