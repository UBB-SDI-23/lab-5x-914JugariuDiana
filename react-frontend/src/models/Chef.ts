import { Food } from "./Food";

export interface Chef{
    id: number;
    firstName:string;
    lastName: string;
    prizes: number;
    dob: string;
    cnp: string;
    foods?: Food[];
}