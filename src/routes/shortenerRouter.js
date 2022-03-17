import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { postUrl, getUrl, deleteUrl } from "../controllers/urlController.js";



const shortenerRouter = Router();

shortenerRouter.post('/urls/shorten', validateTokenMiddleware, postUrl);
shortenerRouter.get('/urls/:shortUrl', getUrl);
shortenerRouter.delete('/urls/:id', validateTokenMiddleware, deleteUrl);



export default shortenerRouter;