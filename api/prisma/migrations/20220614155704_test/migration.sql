-- DropForeignKey
ALTER TABLE `Notfications` DROP FOREIGN KEY `Notfications_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_state_id_fkey`;

-- DropForeignKey
ALTER TABLE `TicketUser` DROP FOREIGN KEY `TicketUser_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `TicketUser` DROP FOREIGN KEY `TicketUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserProject` DROP FOREIGN KEY `UserProject_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notfications` ADD CONSTRAINT `Notfications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketUser` ADD CONSTRAINT `TicketUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketUser` ADD CONSTRAINT `TicketUser_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
