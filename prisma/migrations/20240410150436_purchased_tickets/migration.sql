-- CreateTable
CREATE TABLE "PurchasedTickets" (
    "purchase_ticket_id" TEXT NOT NULL,
    "ticket_name" TEXT NOT NULL,
    "ticket_type" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "purchase_quantity" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PurchasedTickets_pkey" PRIMARY KEY ("purchase_ticket_id")
);

-- AddForeignKey
ALTER TABLE "PurchasedTickets" ADD CONSTRAINT "PurchasedTickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
