/*
  Warnings:

  - Made the column `lat` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `long` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "lat" SET NOT NULL,
ALTER COLUMN "long" SET NOT NULL;
