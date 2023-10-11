import express,  {Express,Request,Response} from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import {requestRouter} from "./routes/requests.routes";
import errorHandler from "./middlewares/error.middleware";
import morgan from "morgan";
import usersRoutes from "./routes/users.routes";
import config from "./config/config";

const app: Express = express()
const corsOptions = {
    origin: config.app.ORIGIN
}

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(fileUpload({
    useTempFiles: false,
    tempFileDir: "./uploads",
    limits: {fileSize: 10000000}, // 10MB max file(s) size
    abortOnLimit: true // default: false (if true, files will not be uploaded and an error event will be emitted)
}))
app.use("/api", requestRouter)
app.use("/api/users", usersRoutes)

app.get("/", (req:Request,res:Response)=>{
    res.status(200).json({message: "Welcome to the API World"})
})

app.get("/hi", (req:Request,res:Response)=>{
    res.status(200).json({message: "HI"})
})

app.use(errorHandler)

export default app
