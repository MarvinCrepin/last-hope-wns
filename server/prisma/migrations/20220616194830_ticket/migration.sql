/*
  Warnings:

  - You are about to alter the column `passed_time` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Ticket` MODIFY `passed_time` DOUBLE NULL;
