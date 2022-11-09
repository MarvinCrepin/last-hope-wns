/*
  Warnings:

  - Added the required column `project_id` to the `TicketDurationUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `TicketDurationUser` ADD COLUMN `project_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TicketDurationUser` ADD CONSTRAINT `TicketDurationUser_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
