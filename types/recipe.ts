export interface IRecipe {
    id?: number;
    title: string;
    description: string;
  ingredients: IRecipeIngredient[];
  instructions: string;
  time: number;
  difficulty: IRecipeDifficulties;
  authorId?: number;
}

export type IRecipeDifficulties = "easy" | "medium" | "hard" | "pro";

export type IRecipeIngredient = {
    name: string;
    quantity: string;
}

// model recipes {
//     id           Int      @id @default(autoincrement())
//     title        String
//     description  String
//     ingredients  String
//     instructions String
//     time         Int
//     difficulty   String
//     createdAt    DateTime @default(now())
//     updatedAt    DateTime @updatedAt
//     author       users?   @relation(fields: [authorId], references: [id])
//     authorId     Int?
//   }
