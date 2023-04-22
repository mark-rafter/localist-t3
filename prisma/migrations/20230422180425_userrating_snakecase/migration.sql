/*
  Warnings:

  - You are about to drop the `UserRating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRating" DROP CONSTRAINT "UserRating_rated_by_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRating" DROP CONSTRAINT "UserRating_rating_for_id_fkey";

-- DropTable
DROP TABLE "UserRating";

-- CreateTable
CREATE TABLE "user_rating" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "rated_by_id" TEXT NOT NULL,
    "rating_for_id" TEXT NOT NULL,

    CONSTRAINT "user_rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_rated_by_id_fkey" FOREIGN KEY ("rated_by_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_rating_for_id_fkey" FOREIGN KEY ("rating_for_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
