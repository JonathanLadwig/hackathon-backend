import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { investecController } from "./controllers/investecController";
import { serp } from "./controllers/serpApi";
import { Result } from "./models/results";

let result: Result | null = null;

export const storeResult = (data: Result) => {
  result = data;
};

export const getResult = () => {
  return result ?? {} as Result;
};

const app = new Elysia()
  .use(cors())
    .use(swagger())
  .use(swagger())
  .get("/", () => "Hi Elysia")
    .use(investecController)
  .use(serp)
  .listen(3000);
    console.log(
        `:fox_face: Elysia is running at ${app.server?.hostname}:${app.server?.port}`
      );

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
