import app from "./app";
import dotenv from "dotenv";
import http from "http";
import { sequelize } from "./config/dbConnect";
import { Server as socketServer } from "socket.io";
import { initializeSocket } from "./sockets/socket";
dotenv.config();

const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);

const io = new socketServer(httpServer, 
    {
        cors: {
            origin: 'localhost:4000',
        }
    }
);

initializeSocket(io);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('databae connected successfully');
        
        await sequelize.sync({alter: true});
        console.log('model synced');

        httpServer.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        });
        
    } catch(error) {
        console.error('Unable to connecte to database', error);
        process.exit(1);
    }
}

startServer();



