-- AddForeignKey
ALTER TABLE `PhotoApproval` ADD CONSTRAINT `PhotoApproval_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
