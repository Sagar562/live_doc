import { Router } from "express";
import { createDocument, saveDocument, getAllDocuments } from "../controllers/documentController";

const route = Router();

// load the document
route.post('/create', createDocument);
route.post('/save-document', saveDocument);
route.get('/allDocuments', getAllDocuments);
 
export default route;