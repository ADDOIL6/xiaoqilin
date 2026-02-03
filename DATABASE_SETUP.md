# 数据库设置指南

## 📋 数据库要求

- **数据库类型**: MySQL 8.0+
- **字符集**: utf8mb4
- **排序规则**: utf8mb4_unicode_ci

## 🚀 快速设置

### 方法1: 使用完整数据库备份（推荐）

```bash
# 1. 创建数据库
mysql -u root -p
```

```sql
CREATE DATABASE xiaoqilin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'xiaoqilin'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON xiaoqilin.* TO 'xiaoqilin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```bash
# 2. 导入数据库结构和数据
mysql -u xiaoqilin -p xiaoqilin < database/schema.sql
```

### 方法2: 使用Drizzle ORM迁移

```bash
# 1. 创建数据库（同上）

# 2. 配置环境变量
cp .env.example .env
# 编辑.env文件，设置DATABASE_URL

# 3. 运行迁移
pnpm drizzle-kit push:mysql
```

## 📁 数据库文件说明

### 1. database/schema.sql
完整的数据库备份文件，包含：
- 所有表结构
- 索引和约束
- 示例数据（可选）

### 2. drizzle/
Drizzle ORM迁移文件目录：
- `0000_absurd_maelstrom.sql` - 初始数据库结构
- `0001_flippant_ulik.sql` - 用户和房源表
- `0002_stormy_true_believers.sql` - 求租功能
- `0003_clean_wrecking_crew.sql` - 最新更新
- `schema.ts` - Drizzle schema定义

### 3. drizzle.config.ts
Drizzle ORM配置文件

## 🗄️ 数据库表结构

主要数据表：

### users (用户表)
- id - 用户ID
- email - 邮箱
- name - 姓名
- avatar - 头像
- created_at - 创建时间

### listings (房源表)
- id - 房源ID
- title - 标题
- description - 描述
- city - 城市
- price - 价格
- bedrooms - 卧室数
- bathrooms - 浴室数
- available_from - 可入住日期
- user_id - 发布用户ID
- created_at - 创建时间

### rental_requests (求租表)
- id - 求租ID
- title - 标题
- description - 描述
- city - 城市
- budget - 预算
- bedrooms - 卧室数
- user_id - 发布用户ID
- created_at - 创建时间

## 🔧 配置数据库连接

### 1. 编辑.env文件

```env
DATABASE_URL=mysql://username:password@host:port/database
```

**示例**：
```env
# 本地开发
DATABASE_URL=mysql://xiaoqilin:your_password@localhost:3306/xiaoqilin

# 生产环境
DATABASE_URL=mysql://user:pass@prod-server.com:3306/xiaoqilin
```

### 2. 测试数据库连接

```bash
# 使用MySQL客户端测试
mysql -h localhost -u xiaoqilin -p xiaoqilin

# 或使用Node.js测试
node -e "require('mysql2').createConnection(process.env.DATABASE_URL).connect(err => console.log(err ? 'Failed' : 'Success'))"
```

## 📊 数据库管理工具

### Drizzle Studio (推荐)
```bash
# 启动Drizzle Studio
pnpm drizzle-kit studio

# 访问 https://local.drizzle.studio
```

### 其他工具
- **MySQL Workbench** - 图形化管理工具
- **phpMyAdmin** - Web管理界面
- **DBeaver** - 通用数据库工具

## 🔄 数据库迁移

### 创建新迁移

```bash
# 1. 修改 drizzle/schema.ts

# 2. 生成迁移文件
pnpm drizzle-kit generate:mysql

# 3. 应用迁移
pnpm drizzle-kit push:mysql
```

### 回滚迁移

```bash
# 手动回滚（需要备份）
mysql -u xiaoqilin -p xiaoqilin < backup.sql
```

## 💾 数据库备份

### 备份数据库

```bash
# 完整备份
mysqldump -u xiaoqilin -p xiaoqilin > backup_$(date +%Y%m%d_%H%M%S).sql

# 仅备份结构
mysqldump -u xiaoqilin -p --no-data xiaoqilin > schema_only.sql

# 仅备份数据
mysqldump -u xiaoqilin -p --no-create-info xiaoqilin > data_only.sql
```

### 恢复数据库

```bash
mysql -u xiaoqilin -p xiaoqilin < backup.sql
```

## 🔒 安全建议

1. **使用强密码**
   - 数据库用户密码至少12位
   - 包含大小写字母、数字和特殊字符

2. **限制访问权限**
   ```sql
   -- 仅允许本地访问
   CREATE USER 'xiaoqilin'@'localhost' IDENTIFIED BY 'password';
   
   -- 允许特定IP访问
   CREATE USER 'xiaoqilin'@'192.168.1.100' IDENTIFIED BY 'password';
   ```

3. **定期备份**
   - 每天自动备份数据库
   - 保留至少7天的备份

4. **监控数据库**
   - 启用慢查询日志
   - 监控连接数和性能

## 🐛 常见问题

### Q: 连接数据库失败
A: 检查以下几点：
1. MySQL服务是否运行：`sudo systemctl status mysql`
2. 数据库是否存在：`SHOW DATABASES;`
3. 用户权限是否正确：`SHOW GRANTS FOR 'xiaoqilin'@'localhost';`
4. 防火墙是否允许连接

### Q: 字符编码问题
A: 确保数据库和表都使用utf8mb4：
```sql
ALTER DATABASE xiaoqilin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE listings CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Q: 迁移失败
A: 
1. 检查DATABASE_URL是否正确
2. 确保数据库用户有足够权限
3. 查看错误日志：`tail -f /var/log/mysql/error.log`

## 📞 需要帮助？

如果遇到数据库设置问题，请查看：
- MySQL官方文档: https://dev.mysql.com/doc/
- Drizzle ORM文档: https://orm.drizzle.team/

---

**最后更新**: 2026年1月24日
