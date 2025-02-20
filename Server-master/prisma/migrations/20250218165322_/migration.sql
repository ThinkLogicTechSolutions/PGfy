-- CreateEnum
CREATE TYPE "SeaterType" AS ENUM ('OneSeater', 'TwoSeater', 'ThreeSeater', 'FourSeater', 'FiveSeater', 'SixSeater');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "seater" "SeaterType";
