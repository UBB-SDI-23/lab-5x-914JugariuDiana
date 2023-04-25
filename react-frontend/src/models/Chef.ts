import { Food } from "./Food";

export interface Chef{
    firstName:string;
    lastName: string;
    prizes: number;
    dob: Date;
    cnp: string;
    foods?: Food[];
}