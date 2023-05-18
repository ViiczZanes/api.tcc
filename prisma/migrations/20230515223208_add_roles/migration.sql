/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'cozinha', 'garcom', 'cliente');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isAdmin",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'cliente';
