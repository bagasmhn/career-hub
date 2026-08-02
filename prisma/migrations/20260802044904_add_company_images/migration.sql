-- AlterTable
ALTER TABLE `company` ADD COLUMN `banner` VARCHAR(191) NULL,
    ADD COLUMN `logo` VARCHAR(191) NULL,
    MODIFY `description` TEXT NOT NULL;
