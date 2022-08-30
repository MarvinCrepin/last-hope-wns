-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_project_id_fkey`;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
