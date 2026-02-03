#!/bin/bash
# 数据库导入脚本
# Database Import Script

echo "=== 小麒麟转租通 - 数据库导入脚本 ==="
echo "=== Global Rental Platform - Database Import Script ==="
echo ""

# 检查备份文件是否存在
BACKUP_FILE="../database_backup_*.sql"
if [ ! -f $BACKUP_FILE ]; then
    echo "错误：找不到数据库备份文件"
    echo "Error: Database backup file not found"
    exit 1
fi

echo "找到备份文件：$BACKUP_FILE"
echo "Found backup file: $BACKUP_FILE"
echo ""

# 从环境变量中解析数据库连接信息
DB_HOST=$(echo $DATABASE_URL | sed 's/.*@\([^:]*\):.*/\1/')
DB_PORT=$(echo $DATABASE_URL | sed 's/.*:\([0-9]*\)\/.*/\1/')
DB_USER=$(echo $DATABASE_URL | sed 's/.*:\/\/\([^:]*\):.*/\1/')
DB_PASS=$(echo $DATABASE_URL | sed 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/')
DB_NAME=$(echo $DATABASE_URL | sed 's/.*\/\([^?]*\).*/\1/')

echo "数据库连接信息："
echo "Database connection info:"
echo "  主机 Host: $DB_HOST"
echo "  端口 Port: $DB_PORT"
echo "  用户 User: $DB_USER"
echo "  数据库 Database: $DB_NAME"
echo ""

# 导入数据库
echo "开始导入数据库..."
echo "Starting database import..."
mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS $DB_NAME < $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 数据库导入成功！"
    echo "✅ Database import successful!"
else
    echo ""
    echo "❌ 数据库导入失败"
    echo "❌ Database import failed"
    exit 1
fi
