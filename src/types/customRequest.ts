// src/types/customRequest.ts
import { Request } from 'express';
import { Iuser } from '../interface/userInterface'; // Adjust the path as needed

export interface CustomRequest extends Request {
  user?: Iuser | null;
}
