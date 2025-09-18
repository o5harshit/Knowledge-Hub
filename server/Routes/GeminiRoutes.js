import express from "express"
import { verifyToken } from "../Middleware/AuthMiddleware.js";
import { GenerateQans, GenerateSummary, GenerateTags } from "../Controllers/geminiControllers.js";


const GeminiRoutes = express.Router();


GeminiRoutes.post("/summarize",verifyToken,GenerateSummary);
GeminiRoutes.post("/tags",verifyToken,GenerateTags);
GeminiRoutes.post("/generateAns",GenerateQans);


export default GeminiRoutes;