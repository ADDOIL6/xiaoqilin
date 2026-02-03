#!/bin/bash
# 数据库导出脚本
# Database Export Script

echo "=== 小麒麟转租通 - 数据库导出脚本 ==="
echo "=== Global Rental Platform - Database Export Script ==="
echo ""

# 生成备份文件名（包含时间戳）
BACKUP_FILE="../database_backup_$(date +%Y%m%d_%H%M%S).sql"

echo "备份文件名：$BACKUP_FILE"
echo "Backup filename: $BACKUP_FILE"
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

# 导出数据库
echo "开始导出数据库..."
echo "Starting database export..."
mysqldump --no-tablespaces --single-transaction --quick --lock-tables=false \
  -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_FILE

if [ $? -eq 0 ]; then
    FILESIZE=$(ls -lh $BACKUP_FILE | awk '{print $5}')
    echo ""
    echo "✅ 数据库导出成功！"
    echo "✅ Database export successful!"
    echo "   文件大小 File size: $FILESIZE"
    echo "   文件路径 File path: $BACKUP_FILE"
else
    echo ""
    echo "❌ 数据库导出失败"
    echo "❌ Database export failed"
    exit 1
fi
