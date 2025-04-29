import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid"; // Use 'uuid' package for UUID generation
import { User } from "../models/user";
import { Iuser } from "../interface/userInterface";
import { CustomRequest } from "../types/customRequest";

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    let cookieId = req.cookies.cookieId;
    let user: Iuser | null = null;

    if (cookieId) 
    {
      const foundUser = await User.findOne({
        where: { cookieId },
      });
      user = foundUser ? (foundUser.toJSON() as Iuser) : null;
    }
  
    req.user = user;
    next();
  } catch (error) {
    console.error("auth error: ", error);
    next(error);
  }
};
