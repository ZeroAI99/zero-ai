CREATE TABLE `waitlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(128),
	`role` varchar(64),
	`message` text,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `waitlist_id` PRIMARY KEY(`id`),
	CONSTRAINT `waitlist_email_unique` UNIQUE(`email`)
);
