-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_product_owner_id_fkey`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_product_owner_id_fkey` FOREIGN KEY (`product_owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
