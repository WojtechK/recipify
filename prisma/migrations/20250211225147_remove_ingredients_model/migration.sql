/*
  Warnings:

  - You are about to drop the `RecipeIngredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredients" DROP CONSTRAINT "RecipeIngredients_id_fkey";

-- AlterTable
ALTER TABLE "Recipes" ADD COLUMN     "ingredients" JSONB[];

-- DropTable
DROP TABLE "RecipeIngredients";
