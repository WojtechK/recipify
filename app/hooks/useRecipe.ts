import { IRecipe } from "@/app/types/recipe"
import axios from "axios";

export const useRecipe = () => {

    const submitNewRecipe = async (data: IRecipe) => {
        return await axios.post("/api/recipes", data);
    }

    return {
        submitNewRecipe,
    }}
