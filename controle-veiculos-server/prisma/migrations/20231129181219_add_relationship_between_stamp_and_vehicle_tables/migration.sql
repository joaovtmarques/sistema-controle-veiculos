/*
  Warnings:

  - Added the required column `stampId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lic` to the `Stamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vencHab` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stampId" TEXT NOT NULL,
    CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Vehicle_stampId_fkey" FOREIGN KEY ("stampId") REFERENCES "Stamp" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("color", "id", "model", "plate", "type", "userId") SELECT "color", "id", "model", "plate", "type", "userId" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_stampId_key" ON "Vehicle"("stampId");
CREATE TABLE "new_Stamp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "SU" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "warName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lic" INTEGER NOT NULL,
    "vencHab" INTEGER NOT NULL,
    CONSTRAINT "Stamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stamp" ("SU", "id", "number", "plate", "rank", "status", "userId", "warName") SELECT "SU", "id", "number", "plate", "rank", "status", "userId", "warName" FROM "Stamp";
DROP TABLE "Stamp";
ALTER TABLE "new_Stamp" RENAME TO "Stamp";
CREATE UNIQUE INDEX "Stamp_number_key" ON "Stamp"("number");
CREATE UNIQUE INDEX "Stamp_plate_key" ON "Stamp"("plate");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
