import { Request, Response } from "express";
import { Document } from "../models/document";
import { CustomRequest } from "../types/customRequest";
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { Iuser } from "../interface/userInterface";

// create the document
export const createDocument = async(req: CustomRequest, res: Response) => {

    try {
        let user:Iuser; 
        console.log(req.user);
        if (req.user == null)
        {
            const cookieId = uuidv4();
            const newUser = await User.create({ cookieId: cookieId });
            user = newUser.toJSON() as Iuser;
    
            res.cookie('cookieId', cookieId, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
        }
        else
        {
            user = req.user;

            if (!user)
            {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
                return;
            }
        }
        const newDoc = await Document.create({
            userId: user.id,
            content: '',
        });

        res.status(201).json({
            document: newDoc,
            success: true,
            message: 'New document created',
        });

    } catch(error) {
        console.log("document controller error : ", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        });
    }
};

// save the document
export const saveDocument = async(req: Request, res: Response) => {
    try {
        console.log(req.body);
        const {docId, content} = req.body;

        if (!docId || !content)
        {
            res.status(400).json({
                success: false,
                message: 'All fields required',
            });
            return;
        }

        const document = await Document.findOne({
            where: {
                docId: docId,
            }
        });

        if (!document)
        {
            res.status(404).json({
                success: false,
                message: 'Document not found',
            });
            return;
        }

        document.content = content || document.content;
        await document.save();
        
        res.status(200).json({
            updatedDocument: document,
            success: true,
            messsge: 'Document saved successfully',
        });

    } catch(error) {
        console.log('Error: ', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        });
    }
};

// get all the documents
export const getAllDocuments = async (req: CustomRequest, res: Response) => {

    try {
        const user = req.user;

        if (!user)
        {
            res.status(401).json({
                success: false,
                message: 'Invalid user',
            })
            return;
        }

        // get all documents of user
        const allDocuments = await Document.findAll({
            where: {
                userId: user?.id,
            },
        });

        if (!allDocuments)
        {
            res.status(404).json({
                success: false,
                message: 'No document found',
            });
            return;
        }

        res.status(200).json({
            documents: allDocuments,
            success: true,
            message: 'All document fetched successfully',
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error
        });
    }
};
