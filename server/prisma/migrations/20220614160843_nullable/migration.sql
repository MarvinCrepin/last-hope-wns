-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_product_owner_id_fkey`;

-- AlterTable
ALTER TABLE `Project` MODIFY `product_owner_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_product_owner_id_fkey` FOREIGN KEY (`product_owner_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
