import {Router} from "express";
import {createUser, getAllUsers} from "../controllers/users.controllers";

const usersRoutes = Router()

usersRoutes.get("/", getAllUsers)
usersRoutes.post("/",createUser)


export default usersRoutes
