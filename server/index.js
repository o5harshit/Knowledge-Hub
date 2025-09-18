import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import AuthRoutes from "./Routes/AuthRoutes.js";
import DocumentRoutes from "./Routes/DocumentRoutes.js";
import gemini from "./Config/gemini.js";
import GeminiRoutes from "./Routes/GeminiRoutes.js";



dotenv.config();


const app = express();
const port = process.env.PORT || 3001;


app.use(cors({
    origin: [process.env.ORIGIN,process.env.ADMIN_ORIGIN], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If using cookies/auth headers
}))
app.use(express.json());
app.use(cookieParser());


app.listen(port,() => {
    console.log("app is running on port 8747");
})

async function main(){
    mongoose.connect(process.env.MONGO_URL);
}

main().then(() => {
    console.log("connected to DB");
}).catch((err) =>{
    console.log(err);
})

app.use("/api/auth",AuthRoutes);
app.use("/api/doc",DocumentRoutes);
app.use("/api/gemini",GeminiRoutes);


