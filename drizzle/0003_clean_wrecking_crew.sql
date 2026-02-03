CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorId` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`coverImage` text,
	`category` enum('guide','tips','news','city_life') NOT NULL,
	`viewCount` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`listingId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `listingImages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`listingId` int NOT NULL,
	`imageUrl` text NOT NULL,
	`imageKey` text NOT NULL,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `listingImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `listings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text,
	`propertyType` enum('studio','1b1b','2b2b','3b3b','4b4b','other') NOT NULL,
	`city` varchar(100) NOT NULL,
	`country` varchar(100) NOT NULL,
	`address` text NOT NULL,
	`postcode` varchar(20),
	`latitude` decimal(10,7),
	`longitude` decimal(10,7),
	`price` decimal(10,2) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'GBP',
	`availableFrom` timestamp NOT NULL,
	`availableTo` timestamp,
	`minRentalPeriod` int,
	`furnished` boolean DEFAULT false,
	`billsIncluded` boolean DEFAULT false,
	`status` enum('active','rented','inactive') NOT NULL DEFAULT 'active',
	`viewCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `listings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `marketplaceImages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itemId` int NOT NULL,
	`imageUrl` text NOT NULL,
	`imageKey` text NOT NULL,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `marketplaceImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `marketplaceItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'GBP',
	`category` varchar(50) NOT NULL,
	`condition` enum('new','like_new','good','fair','poor') NOT NULL,
	`city` varchar(100) NOT NULL,
	`status` enum('available','sold','inactive') NOT NULL DEFAULT 'available',
	`viewCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `marketplaceItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`content` text NOT NULL,
	`type` enum('match','message','system') NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`relatedListingId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rentalRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`city` varchar(100) NOT NULL,
	`country` varchar(100) NOT NULL,
	`propertyTypes` text NOT NULL,
	`budget` decimal(10,2) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'GBP',
	`moveInDate` timestamp NOT NULL,
	`moveOutDate` timestamp,
	`description` text,
	`status` enum('active','fulfilled','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rentalRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(100),
	`city` varchar(100),
	`content` text NOT NULL,
	`rating` int NOT NULL,
	`isVisible` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `viewHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`listingId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `viewHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` text;--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;