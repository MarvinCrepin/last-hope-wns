-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `TicketUser` DROP FOREIGN KEY `TicketUser_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `TicketUser` DROP FOREIGN KEY `TicketUser_userId_fkey`;

-- AddForeignKey
ALTER TABLE `TicketUser` ADD CONSTRAINT `TicketUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketUser` ADD CONSTRAINT `TicketUser_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
