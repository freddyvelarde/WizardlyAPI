/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `method` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `headers` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `response_code` on table `Response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `response_headers` on table `Response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `response_body` on table `Response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Workshop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `request_id` on table `Workshop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `public` on table `Workshop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "method" SET NOT NULL,
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "headers" SET NOT NULL,
ALTER COLUMN "body" SET NOT NULL;

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "response_code" SET NOT NULL,
ALTER COLUMN "response_headers" SET NOT NULL,
ALTER COLUMN "response_body" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workshop" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "request_id" SET NOT NULL,
ALTER COLUMN "public" SET NOT NULL,
ALTER COLUMN "public" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
