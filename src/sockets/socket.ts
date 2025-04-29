import { Server, Socket } from "socket.io";
import { Document } from "../models/document";
import { serverToClient } from "./types/socketInterfaces";

export const initializeSocket = (io: Server<serverToClient>) => {
    
    // create socket connection
    io.on('connection', (socket: Socket) => {
        console.log('New client joind', socket.id);

        socket.on('join-document', async (docId: string) => {
            socket.join(docId);
            console.log(`socketId: ${socket.id} has joined ${docId}`);

            const doc = await Document.findOne({
                where: {
                    docId: docId,
                }
            });
            // sends the document
            socket.emit('document', doc?.content || '');

            // handle the changes in document   
            socket.on('changed-document', (changedDoc: string) => {
                socket.to(docId).emit('updated-document', changedDoc);
            });
        })

        socket.on('disconnect', () => {
            console.log(`socketId: ${socket.id} has leave the document`);
        })

    })

}