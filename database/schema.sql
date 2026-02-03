-- 小麒麟全球转租通 - 数据库备份
-- 生成时间: 2026-01-14 00:33:00
-- 数据库类型: MySQL (TiDB)

-- ============================================
-- 表结构
-- ============================================

-- users 表
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) NOT NULL,
  `name` text,
  `email` varchar(320),
  `loginMethod` varchar(64),
  `role` enum('user', 'admin') NOT NULL DEFAULT 'user',
  `avatar` text,
  `phone` varchar(20),
  `bio` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openId` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- listings 表
CREATE TABLE IF NOT EXISTS `listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `propertyType` enum('studio', '1b1b', '2b2b', '3b3b', '4b4b', 'other') NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `postcode` varchar(20),
  `latitude` decimal(10, 7),
  `longitude` decimal(10, 7),
  `price` decimal(10, 2) NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'GBP',
  `availableFrom` timestamp NOT NULL,
  `availableTo` timestamp,
  `minRentalPeriod` int,
  `furnished` boolean NOT NULL DEFAULT false,
  `billsIncluded` boolean NOT NULL DEFAULT false,
  `status` enum('active', 'rented', 'inactive') NOT NULL DEFAULT 'active',
  `viewCount` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `listings_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- listingImages 表
CREATE TABLE IF NOT EXISTS `listingImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listingId` int NOT NULL,
  `imageUrl` text NOT NULL,
  `imageKey` text NOT NULL,
  `displayOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `listingId` (`listingId`),
  CONSTRAINT `listingImages_listingId_fk` FOREIGN KEY (`listingId`) REFERENCES `listings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- rentalRequests 表
CREATE TABLE IF NOT EXISTS `rentalRequests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `propertyTypes` text NOT NULL,
  `budget` decimal(10, 2) NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'GBP',
  `moveInDate` timestamp NOT NULL,
  `moveOutDate` timestamp,
  `description` text,
  `status` enum('active', 'fulfilled', 'inactive') NOT NULL DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `rentalRequests_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- favorites 表
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `listingId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `listingId` (`listingId`),
  UNIQUE KEY `userId_listingId` (`userId`, `listingId`),
  CONSTRAINT `favorites_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `favorites_listingId_fk` FOREIGN KEY (`listingId`) REFERENCES `listings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- viewHistory 表
CREATE TABLE IF NOT EXISTS `viewHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int,
  `listingId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `listingId` (`listingId`),
  CONSTRAINT `viewHistory_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `viewHistory_listingId_fk` FOREIGN KEY (`listingId`) REFERENCES `listings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- notifications 表
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `type` enum('match', 'message', 'system') NOT NULL,
  `isRead` boolean NOT NULL DEFAULT false,
  `relatedListingId` int,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `relatedListingId` (`relatedListingId`),
  CONSTRAINT `notifications_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `notifications_relatedListingId_fk` FOREIGN KEY (`relatedListingId`) REFERENCES `listings` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- reviews 表
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `userName` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `rating` int NOT NULL,
  `isVisible` boolean NOT NULL DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `reviews_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- articles 表
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `excerpt` text,
  `coverImage` text,
  `category` enum('guide', 'tips', 'news', 'city_life') NOT NULL,
  `viewCount` int NOT NULL DEFAULT 0,
  `isPublished` boolean NOT NULL DEFAULT false,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `articles_authorId_fk` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- marketplaceItems 表
CREATE TABLE IF NOT EXISTS `marketplaceItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `price` decimal(10, 2) NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'GBP',
  `category` varchar(50) NOT NULL,
  `condition` enum('new', 'like_new', 'good', 'fair', 'poor') NOT NULL,
  `city` varchar(100) NOT NULL,
  `status` enum('available', 'sold', 'inactive') NOT NULL DEFAULT 'available',
  `viewCount` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `marketplaceItems_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- marketplaceImages 表
CREATE TABLE IF NOT EXISTS `marketplaceImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemId` int NOT NULL,
  `imageUrl` text NOT NULL,
  `imageKey` text NOT NULL,
  `displayOrder` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `marketplaceImages_itemId_fk` FOREIGN KEY (`itemId`) REFERENCES `marketplaceItems` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 示例数据
-- ============================================

-- 插入房源数据
INSERT INTO `listings` (`id`, `userId`, `title`, `description`, `propertyType`, `city`, `country`, `address`, `postcode`, `latitude`, `longitude`, `price`, `currency`, `availableFrom`, `availableTo`, `minRentalPeriod`, `furnished`, `billsIncluded`, `status`, `viewCount`, `createdAt`, `updatedAt`) VALUES
(1, 1, '曼彻斯特市中心Studio公寓 - 采光好 视野佳', '位于曼彻斯特市中心的精装Studio公寓，步行5分钟到大学，周边生活便利，采光极佳。', 'studio', '曼彻斯特', '英国', 'Oxford Road, Manchester M13 9PL', NULL, NULL, NULL, 1200.00, 'GBP', '2026-02-01 00:00:00', '2026-08-31 00:00:00', NULL, 1, 1, 'active', 0, '2026-01-13 08:14:43', '2026-01-13 08:14:43'),
(2, 1, '伦敦Zone 2 一室一厅 - 交通便利', '伦敦Zone 2优质一室一厅，地铁站步行3分钟，全新装修，家具齐全。', '1b1b', '伦敦', '英国', 'Camden Road, London NW1 9LG', NULL, NULL, NULL, 1800.00, 'GBP', '2026-01-15 00:00:00', '2026-07-15 00:00:00', NULL, 1, 0, 'active', 0, '2026-01-13 08:14:43', '2026-01-13 08:14:43'),
(3, 1, '爱丁堡老城区两室两厅 - 历史建筑', '爱丁堡老城区两室两厅，位于历史建筑内，步行到爱丁堡大学10分钟。', '2b2b', '爱丁堡', '英国', 'George Street, Edinburgh EH2 2PF', NULL, NULL, NULL, 1500.00, 'GBP', '2026-03-01 00:00:00', '2026-09-01 00:00:00', NULL, 1, 1, 'active', 0, '2026-01-13 08:14:43', '2026-01-13 08:14:43');

-- 插入评价数据
INSERT INTO `reviews` (`id`, `userId`, `userName`, `city`, `content`, `rating`, `isVisible`, `createdAt`) VALUES
(1, 1, '孔同学', '伦敦', '这个平台为我转租和寻找的人提供了一个便利，我找到这个平台我获得了关系统，平台员工非常耐心，一直在帮助我找到我的房源对接人，就算我的房子没有成功对接到也没有收我的任何费用，也是让我感到非常放心了，也是让我感到非常放心了，也是让我感到非常放心了。', 5, 1, '2026-01-13 08:18:58'),
(2, 1, '陈同学', '华盛顿', '真的好用，自己之前很担心和房东的人提供了了好多钱都找不到一些便利，平台员工以后就找到这个平台我获得了一些便利，平台员工以后就找到这个平台我获得了一些便利，平台员工以后就找到这个平台我获得了一些便利，平台员工以后就找到这个平台我获得了一些便利，平台员工以后就找到这个平台我获得了一些便利。', 5, 1, '2026-01-13 08:18:58'),
(3, 1, '李同学', '曼彻斯特', '超级推荐！作为留学生，假期回国但租约未到期一直是个头疼的问题。小麒麟转租通帮我快速找到了接手的租客，省心又省钱。客服响应也很及时，整个流程很顺畅。', 5, 1, '2026-01-13 08:18:58'),
(4, 1, '王同学', '爱丁堡', '非常感谢这个平台！我在爱丁堡找房子找了好久，通过小麒麟转租通找到了性价比超高的房源。房东人也很好，省去了很多中介费。强烈推荐给其他留学生！', 5, 1, '2026-01-13 08:18:58');

-- ============================================
-- 注意事项
-- ============================================

-- 1. 本文件仅包含表结构和示例数据
-- 2. 实际部署时需要：
--    - 创建数据库用户并授予权限
--    - 配置 DATABASE_URL 环境变量
--    - 运行 drizzle-kit push 同步 schema
-- 3. 如果迁移到其他平台，请确保：
--    - MySQL 版本 >= 5.7
--    - 支持 InnoDB 引擎
--    - 支持外键约束
--    - 字符集设置为 utf8mb4

-- ============================================
-- 备份完成
-- ============================================
