-- CreateTable
CREATE TABLE "EventTicket" (
    "ticket_name" TEXT NOT NULL,
    "ticket_type" TEXT NOT NULL,
    "ticket_price" BIGINT NOT NULL,
    "available_quantity" BIGINT NOT NULL,
    "total_quantity" BIGINT NOT NULL,
    "event_ticket_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "EventTicket_pkey" PRIMARY KEY ("event_ticket_id")
);

-- AddForeignKey
ALTER TABLE "EventTicket" ADD CONSTRAINT "EventTicket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
