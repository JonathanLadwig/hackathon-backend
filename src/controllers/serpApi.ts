import Elysia from "elysia";
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