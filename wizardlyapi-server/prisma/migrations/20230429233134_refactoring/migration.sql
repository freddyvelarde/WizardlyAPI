/*
  Warnings:

  - You are about to drop the column `public` on the `Workshop` table. All the data in the column will be lost.
  - You are about to drop the column `request_id` on the `Workshop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "public",
DROP COLUMN "request_id",
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;
