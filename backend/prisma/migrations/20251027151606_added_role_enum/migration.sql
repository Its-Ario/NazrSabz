/*
  Warnings:

  - The values [withdraw,addition] on the enum `TransactionAction` will be removed. If these variants are still used in the database, this will fail.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'DRIVER', 'USER');

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionAction_new" AS ENUM ('WITHDRAWL', 'ADDITION');
ALTER TABLE "Transaction" ALTER COLUMN "action" TYPE "TransactionAction_new" USING ("action"::text::"TransactionAction_new");
ALTER TYPE "TransactionAction" RENAME TO "TransactionAction_old";
ALTER TYPE "TransactionAction_new" RENAME TO "TransactionAction";
DROP TYPE "public"."TransactionAction_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
