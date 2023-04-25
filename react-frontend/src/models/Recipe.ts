import { Food } from "./Food";
import { Ingredient } from "./Ingredient";

export interface Recipe{
    foodId: Food;
    ingredientId: Ingredient;
    quantityOfIngredient: number;
    specifications: string;
}