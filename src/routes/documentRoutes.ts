import { Router } from "express";
import { createDocument, saveDocument, getAllDocuments, loadDocument } from "../controllers/documentController";

const route = Router();

// load the document
route.post('/create', createDocument);
route.post('/save-document', saveDocument);
route.get('/allDocuments', getAllDocuments);
route.get('/:id', loadDocument);
 
export default route;