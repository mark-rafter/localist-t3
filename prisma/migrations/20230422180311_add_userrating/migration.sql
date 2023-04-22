-- CreateTable
CREATE TABLE "UserRating" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "rated_by_id" TEXT NOT NULL,
    "rating_for_id" TEXT NOT NULL,

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_rated_by_id_fkey" FOREIGN KEY ("rated_by_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_rating_for_id_fkey" FOREIGN KEY ("rating_for_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
