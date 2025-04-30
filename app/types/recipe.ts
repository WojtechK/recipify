export interface IRecipe {
    title: string;
    description: string;
  ingredients: IRecipeIngredient[];
  instructions: string;
  time: number;
  difficulty: IRecipeDifficulties;
  authorId: number;
}

export type IRecipeDifficulties = "easy" | "medium" | "hard" | "pro";

export type IRecipeIngredient = {
    name: string;
    quantity: string;
}
