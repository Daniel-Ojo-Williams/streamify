import type { Request, Response, NextFunction } from "express";
import { HttpCode } from "../constants/statusCodes";
import { decodeToken } from "../helpers/token";
import { TokenExpiredError } from "jsonwebtoken";
import { TokenUser } from "../types";

export const authMid = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies['token'];
      if (!token) return res.status(HttpCode.UNAUTHORISED).json({ message: 'Please authenticate to access this route' });  
  
      const user = decodeToken<TokenUser>(token);
      res.locals.user = user;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(HttpCode.UNAUTHORISED).json({ message: 'Please authenticate to gain access' });
      }

      res.status(HttpCode.BAD_REQUEST).json({ message: (error as Error).message });
    }
  }