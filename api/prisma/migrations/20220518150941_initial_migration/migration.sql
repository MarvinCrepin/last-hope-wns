-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `start_at` DATETIME(3) NOT NULL,
    `due_at` DATETIME(3) NOT NULL,
    `end_at` DATETIME(3) NOT NULL,
    `product_owner_id` INTEGER NOT NULL,
    `advancement` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;