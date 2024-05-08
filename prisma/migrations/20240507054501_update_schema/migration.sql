/*
  Warnings:

  - You are about to drop the column `filePath` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `DownloadVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DownloadVerification" DROP CONSTRAINT "DownloadVerification_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "filePath",
DROP COLUMN "imagePath";

-- DropTable
DROP TABLE "DownloadVerification";
