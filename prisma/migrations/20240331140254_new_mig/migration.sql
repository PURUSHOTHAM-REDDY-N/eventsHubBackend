/*
  Warnings:

  - You are about to drop the column `event_loaction_type` on the `Event` table. All the data in the column will be lost.
  - Added the required column `event_location_type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_loaction_type",
ADD COLUMN     "event_location_type" TEXT NOT NULL;
