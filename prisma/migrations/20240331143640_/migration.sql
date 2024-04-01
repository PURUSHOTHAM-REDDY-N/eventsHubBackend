/*
  Warnings:

  - The primary key for the `EventTicket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_ticket_id` on the `EventTicket` table. All the data in the column will be lost.
  - The required column `ticket_id` was added to the `EventTicket` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "EventTicket" DROP CONSTRAINT "EventTicket_pkey",
DROP COLUMN "event_ticket_id",
ADD COLUMN     "ticket_id" TEXT NOT NULL,
ADD CONSTRAINT "EventTicket_pkey" PRIMARY KEY ("ticket_id");
