import Elysia from "elysia";
import { getResult } from "..";
import { serpData } from "../constants/jsonData";
import { SerpService } from "../services/serpService";

const serpService = new SerpService;

export const serp = new Elysia({ prefix: '/serp' })
    .get("/lens/:url", async ({ params: { url } }) => {
        try {
            const data = await serpService.getGoogleLensData(url);
            return data;
        } catch (error: any) {
            return { error: error.message };
        }
    })
    .get("/shop/:query", async ({ params: { query } }) => {
        try {
            const data = await serpService.getGoogleShoppingData(query);
            return data;
        } catch (error: any) {
            return { error: error.message };
        }
    })
    .get("/test", async () => {
        try {
            const data = serpService.getStandardDeviation(serpData);
            return data;
        } catch (error: any) {
            return { error: error.message };
        }
    })
    .get("/sort/reviews", async () => {
        try {
            const data = serpService.getSortByReviews(getResult());
            return data;
        } catch (error: any) {
            return { error: error.message };
        }
    })
    .get("/sort/rating", async () => {
        try {
            const data = serpService.getSortByRating(getResult());
            return data;
        } catch (error: any) {
            return { error: error.message };
        }
    })
    .get("/sort/price", async () => {
        try {
            const data = serpService.getSortByPrice(getResult());
            return data;
        } catch (error: any) {
            return { error: error.message };
        }
    })
    .get("/sort/default", async () => {
        try {
            const data = getResult();
            return data;
        } catch (error: any) {
            return { error: error.message };
        }
    })