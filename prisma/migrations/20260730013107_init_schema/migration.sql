/*
  Warnings:

  - The values [COMPANY] on the enum `user_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'SUPERADMIN', 'RECRUITER', 'JOBSEEKER') NOT NULL DEFAULT 'JOBSEEKER';
