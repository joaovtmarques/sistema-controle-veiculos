/*
  Warnings:

  - You are about to drop the column `plate` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `stampId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `vehicleId` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stamp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "SU" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "warName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lic" INTEGER NOT NULL,
    "vencHab" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Stamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Stamp_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stamp" ("SU", "id", "lic", "number", "rank", "status", "userId", "vencHab", "warName") SELECT "SU", "id", "lic", "number", "rank", "status", "userId", "vencHab", "warName" FROM "Stamp";
DROP TABLE "Stamp";
ALTER TABLE "new_Stamp" RENAME TO "Stamp";
CREATE UNIQUE INDEX "Stamp_number_key" ON "Stamp"("number");
CREATE UNIQUE INDEX "Stamp_vehicleId_key" ON "Stamp"("vehicleId");
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("color", "id", "model", "plate", "type", "userId") SELECT "color", "id", "model", "plate", "type", "userId" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
