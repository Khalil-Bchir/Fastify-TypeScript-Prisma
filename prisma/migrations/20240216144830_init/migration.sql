-- AlterTable
ALTER TABLE `userorganization` ADD COLUMN `invitationStatus` ENUM('PENDING', 'ACCEPTED', 'DECLINED') NULL;
