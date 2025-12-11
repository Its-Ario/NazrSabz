-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('ONLINE', 'OFFLINE', 'BUSY');

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "location" geometry(Point, 4326);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "driverStatus" "DriverStatus" DEFAULT 'OFFLINE',
ADD COLUMN     "location" geometry(Point, 4326),
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
ADD COLUMN     "vehicleModel" TEXT;

-- CreateIndex
CREATE INDEX "request_location_idx" ON "Request" USING GIST ("location");
