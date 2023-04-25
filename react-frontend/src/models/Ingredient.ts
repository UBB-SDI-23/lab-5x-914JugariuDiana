import { Recipe } from "./Recipe";

export interface Ingredient{
    id: number;
    ingredientName: string;
    location: string;
    runningLow: boolean;
    expirationDate: string;
    quantity: number;
    foods?: Recipe[];
}