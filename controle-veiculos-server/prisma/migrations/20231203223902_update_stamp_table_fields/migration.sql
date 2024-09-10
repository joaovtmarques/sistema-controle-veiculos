/*
  Warnings:

  - You are about to drop the column `SU` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `warName` on the `Stamp` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stamp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "lic" INTEGER NOT NULL,
    "vencHab" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Stamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Stamp_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stamp" ("id", "lic", "number", "status", "userId", "vehicleId", "vencHab") SELECT "id", "lic", "number", "status", "userId", "vehicleId", "vencHab" FROM "Stamp";
DROP TABLE "Stamp";
ALTER TABLE "new_Stamp" RENAME TO "Stamp";
CREATE UNIQUE INDEX "Stamp_number_key" ON "Stamp"("number");
CREATE UNIQUE INDEX "Stamp_vehicleId_key" ON "Stamp"("vehicleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
