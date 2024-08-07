import { getJson } from "serpapi";
import { storeResult } from "..";
import { serpkey } from "../keys/env";
import { Result } from "../models/results";
import { IShoppingResult, ShoppingResults } from "../models/shopping";

export class SerpService {
    getStandardDeviation(serpData: any) {
        const data = serpData["shopping_results"] as ShoppingResults;

        // Initialize variables
        let total = 0;
        let lowest = Number.MAX_VALUE;
        let highest = Number.MIN_VALUE;
        let count = 0;

        // Calculate total, lowest, and highest (non-zero) prices
        data.forEach((result: { extracted_price: number; }) => {
            if (result.extracted_price > 0) {
                total += result.extracted_price;
                if (result.extracted_price < lowest) {
                    lowest = result.extracted_price;
                }
                if (result.extracted_price > highest) {
                    highest = result.extracted_price;
                }
                count++;
            }
        });

        //Calculate the average/mean
        const mean = total / count

        // Calculate the standard deviation
        const variance = data.reduce((acc: number, result: { extracted_price: number; }) => acc + Math.pow(result.extracted_price - mean, 2), 0) / data.length;
        const std = Math.sqrt(variance);

        // Calculate lower and upper bounds
        const lower = mean - std
        const upper = mean + std

        // Filter results within one standard deviation
        const filtered_results = data.filter((result: { extracted_price: number; }) =>
            result.extracted_price >= lower
        );

        const unfiltered_results = data.filter((result: { extracted_price: number; }) =>
            result.extracted_price < lower
        )

        const filters = serpData["filters"]

        const calculatedResult: Result = {
            mean: mean,
            std: std,
            lower: lower,
            upper: upper,
            lowest: lowest,
            highest: highest,
            filters: filters,
            filtered_results: filtered_results,
            unfiltered_results: unfiltered_results
        };

        storeResult(calculatedResult);

        return calculatedResult
    }

    getSortByReviews(results: Result) {
        // Sort the filtered results by number of reviews, then by price
        results.filtered_results.sort((a: any, b: any) => {
            const reviewsA = a.reviews ?? 0;
            const reviewsB = b.reviews ?? 0;
            if (reviewsB !== reviewsA) {
                return reviewsB - reviewsA;
            }
            return a.extracted_price - b.extracted_price;
        });

        results.unfiltered_results.sort((a: IShoppingResult, b: IShoppingResult) => {
            const reviewsA = a.reviews ?? 0;
            const reviewsB = b.reviews ?? 0;
            if (reviewsB !== reviewsA) {
                return reviewsB - reviewsA;
            }
            return a.extracted_price - b.extracted_price;
        });
        return results;
    }

    getSortByPrice(results: Result) {
        results.filtered_results.sort((a: IShoppingResult, b: IShoppingResult) => {
            return a.extracted_price - b.extracted_price;
        });

        results.unfiltered_results.sort((a: IShoppingResult, b: IShoppingResult) => {
            return a.extracted_price - b.extracted_price;
        });

        return results;
    }

    getSortByRating(results: Result) {
        results.filtered_results.sort((a: IShoppingResult, b: IShoppingResult) => {
            const ratingA = a.rating ?? 0;
            const ratingB = b.rating ?? 0;
            if (ratingB !== ratingA) {
                return ratingB - ratingA;
            }
            return a.extracted_price - b.extracted_price;
        });

        results.unfiltered_results.sort((a: IShoppingResult, b: IShoppingResult) => {
            const ratingA = a.rating ?? 0;
            const ratingB = b.rating ?? 0;
            if (ratingB !== ratingA) {
                return ratingB - ratingA;
            }
            return a.extracted_price - b.extracted_price;
        });

        return results;
    }

    async getGoogleLensData(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            getJson({
                engine: 'google_lens',
                api_key: serpkey,
                url: url,
                country: "za"
            }, (json: any) => {
                if (json) {
                    console.log(json);
                    const knowledgeGraph = json["visual_matches"];
                    if (knowledgeGraph) {
                        resolve(knowledgeGraph); // Resolve with the knowledge graph
                    } else {
                        reject(new Error('Knowledge graph not found in the response'));
                    }
                } else {
                    reject(new Error('No data returned from SerpAPI'));
                }
            });
        });
    }

    async getGoogleShoppingData(query: string) {
        return new Promise((resolve, reject) => {
            getJson({
                engine: "google_shopping",
                api_key: serpkey,
                q: query,
                google_domain: "google.co.za",
                gl: "za",
                location: "South Africa"
            }, (json) => {
                if (json) {
                    // const knowledgeGraph = json["shopping_results"];
                    const knowledgeGraph = this.getStandardDeviation(json);
                    if (knowledgeGraph) {
                        resolve(knowledgeGraph);
                    } else {
                        reject(new Error('Results not found in the response'));
                    }
                } else {
                    reject(new Error('No data returned from SerpAPI'));
                }
            });
        });
    }


}