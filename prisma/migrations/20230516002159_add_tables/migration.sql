/*
  Warnings:

  - You are about to drop the column `table` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "table",
ADD COLUMN     "table_id" TEXT;

-- CreateTable
CREATE TABLE "tables" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;
