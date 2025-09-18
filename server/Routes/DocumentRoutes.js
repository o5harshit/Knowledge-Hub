import express from "express"
import { AddDocument, deleteDocument, GetDocument, getDocumentOfUser, UpdateDocument } from "../Controllers/DocumentControllers.js";
import { verifyToken } from "../Middleware/AuthMiddleware.js";


const DocumentRoutes = express.Router();


DocumentRoutes.post("/AddDocument",verifyToken,AddDocument);
DocumentRoutes.get("/GetDocument",verifyToken,GetDocument);
DocumentRoutes.get("/GetUserdoc",verifyToken,getDocumentOfUser);
DocumentRoutes.patch("/UpdateDocument/:id",verifyToken,UpdateDocument);
DocumentRoutes.patch("/DeleteDocument/:id",verifyToken,deleteDocument);


export default DocumentRoutes;