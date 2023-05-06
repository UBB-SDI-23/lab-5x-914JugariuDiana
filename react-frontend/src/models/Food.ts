import { Chef } from "./Chef";

export interface Food{
    id: number;
    foodName: string;
    proteinGrams: number;
    sugarGrams: number;
    expirationDate: string;
    quantity: number;
    chefCreator?: number;
}