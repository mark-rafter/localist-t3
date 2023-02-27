/*
  Warnings:

  - Added the required column `lat` to the `user_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `user_location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_location" ADD COLUMN     "lat" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "long" DECIMAL(65,30) NOT NULL;
