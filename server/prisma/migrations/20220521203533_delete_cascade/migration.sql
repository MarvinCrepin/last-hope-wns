-- DropForeignKey
ALTER TABLE `TicketUser` DROP FOREIGN KEY `TicketUser_ticketId_fkey`;

-- AddForeignKey
ALTER TABLE `TicketUser` ADD CONSTRAINT `TicketUser_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
