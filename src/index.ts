import { Elysia, t } from "elysia";

const app = new Elysia()
    .get('/', () => 'Hi Eden')
    .listen(3000)

export type App = typeof app 