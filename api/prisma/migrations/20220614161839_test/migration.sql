-- DropForeignKey
ALTER TABLE `Notfications` DROP FOREIGN KEY `Notfications_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Notfications` ADD CONSTRAINT `Notfications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
