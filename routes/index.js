import { clientRouter } from './clients.js';
import { mediaplayerRouter } from "./mediaplayers.js";
import { locationRouter } from "./locations.js";

const route = '/api/v1';

function routerApi(app){
    app.use(`${route}/clients`, clientRouter);
    app.use(`${route}/mediaplayers`, mediaplayerRouter);
    app.use(`${route}/locations`, locationRouter);
}

export {
    routerApi
}