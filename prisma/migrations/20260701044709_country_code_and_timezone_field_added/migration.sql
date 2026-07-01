-- AlterTable
ALTER TABLE "user" ADD COLUMN     "countryCode" TEXT,
ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timezone" TEXT;
