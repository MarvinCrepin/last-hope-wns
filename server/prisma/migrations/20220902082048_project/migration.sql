/*
  Warnings:

  - You are about to drop the column `due_at` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `due_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `start_at` DATETIME(3) NULL,
    MODIFY `end_at` DATETIME(3) NULL;
