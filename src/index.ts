import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { investecController } from './controllers/investecController';

const app = new Elysia()
    .use(swagger())
    .get('/', () => 'Hi Eden')
    .use(investecController)
    .listen(3000)
    console.log(
        `:fox_face: Elysia is running at ${app.server?.hostname}:${app.server?.port}`
      );

export type App = typeof app 

