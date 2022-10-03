/*
  Warnings:

  - You are about to drop the column `advancement` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `advancement`,
    MODIFY `description` VARCHAR(191) NULL;
