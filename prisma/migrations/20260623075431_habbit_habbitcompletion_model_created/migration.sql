-- CreateTable
CREATE TABLE "Habbit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habbit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabbitCompletion" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "habbitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HabbitCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HabbitCompletion_habbitId_date_key" ON "HabbitCompletion"("habbitId", "date");

-- AddForeignKey
ALTER TABLE "Habbit" ADD CONSTRAINT "Habbit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabbitCompletion" ADD CONSTRAINT "HabbitCompletion_habbitId_fkey" FOREIGN KEY ("habbitId") REFERENCES "Habbit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
