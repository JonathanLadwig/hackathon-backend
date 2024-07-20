import { IShoppingResult } from "./shopping";

export interface Result {
    mean: number;
    std: number;
    lower: number;
    upper: number;
    lowest: number;
    highest: number;
    filters: any[];
    filtered_results: IShoppingResult[];
    unfiltered_results: IShoppingResult[];
}