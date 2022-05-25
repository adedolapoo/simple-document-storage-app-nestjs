/*
  Warnings:

  - You are about to drop the column `extension` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Document` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Document` DROP COLUMN `extension`,
    DROP COLUMN `name`,
    DROP COLUMN `size`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL,
    ADD COLUMN `path` VARCHAR(191) NOT NULL;
