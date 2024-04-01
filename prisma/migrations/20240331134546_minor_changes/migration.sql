-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "event_status" TEXT NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "event_location" DROP NOT NULL;
