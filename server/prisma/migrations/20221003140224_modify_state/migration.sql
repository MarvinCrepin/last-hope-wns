-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_state_id_fkey`;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `state_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `State`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
