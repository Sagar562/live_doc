import express, {Request, Response} from "express";
import path from "path";
import documentRoutes from './routes/documentRoutes';
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/document',documentRoutes);

// home route
app.get('/', (req: Request, res: Response) => {
    res.send('Home Page');
});

export default app;