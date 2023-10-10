import {Router} from 'express';
import {protectedRequest, publicRequest, uploadRequest} from "../controllers/requests.controller";
import {checkJwtMiddleware} from "../middlewares/checkJwt.middleware";

export const requestRouter = Router()

requestRouter.get("/public", publicRequest)
requestRouter.get("/protected", checkJwtMiddleware, protectedRequest)
requestRouter.post("/upload", uploadRequest)



