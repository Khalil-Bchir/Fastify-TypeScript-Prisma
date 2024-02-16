-- DropForeignKey
ALTER TABLE `userorganization` DROP FOREIGN KEY `UserOrganization_organizationId_fkey`;

-- DropForeignKey
ALTER TABLE `userorganization` DROP FOREIGN KEY `UserOrganization_userId_fkey`;

-- AlterTable
ALTER TABLE `userorganization` MODIFY `userId` INTEGER NULL,
    MODIFY `organizationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `UserOrganization` ADD CONSTRAINT `UserOrganization_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOrganization` ADD CONSTRAINT `UserOrganization_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`organizationId`) ON DELETE SET NULL ON UPDATE CASCADE;
