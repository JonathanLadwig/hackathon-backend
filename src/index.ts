import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { serp } from "./controllers/serpApi";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get("/", () => "Hi Elysia")
  .use(serp)
  .listen(3000);

export type App = typeof app 