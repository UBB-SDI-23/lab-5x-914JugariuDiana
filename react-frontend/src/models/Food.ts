import { Chef } from "./Chef";

export interface Food{
    foodName: string;
    proteinGrams: number;
    sugarGrams: number;
    expirationDate: Date;
    quantity: number;
    chefCreator: Chef;
}