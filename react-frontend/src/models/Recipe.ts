import { Food } from "./Food";
import { Ingredient } from "./Ingredient";

export interface Recipe{
    id: number;
    foodId: Food;
    ingredientId: Ingredient;
    quantityOfIngredient: number;
    specifications: string;
}