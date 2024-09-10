/*
  Warnings:

  - Added the required column `rank` to the `Stamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warName` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stamp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "SU" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "warName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Stamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stamp" ("SU", "id", "number", "plate", "status", "userId") SELECT "SU", "id", "number", "plate", "status", "userId" FROM "Stamp";
DROP TABLE "Stamp";
ALTER TABLE "new_Stamp" RENAME TO "Stamp";
CREATE UNIQUE INDEX "Stamp_number_key" ON "Stamp"("number");
CREATE UNIQUE INDEX "Stamp_userId_key" ON "Stamp"("userId");
CREATE UNIQUE INDEX "Stamp_plate_key" ON "Stamp"("plate");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
