-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absence" (
    "userId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL DEFAULT gen_random_uuid(),
    "lesson" INTEGER NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
