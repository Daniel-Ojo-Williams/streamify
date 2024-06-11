import type { Request, Response } from "express";
import { addUser, findUserByEmail } from "../services/users.service";
import { User } from "@prisma/client";
import { HttpCode } from "../constants/statusCodes";
import bcrypt from 'bcrypt';
import { genToken } from "../helpers/token";


export const signup = async (req: Request, res: Response) => {
  try {

    const { username, email, password } = <User>req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await addUser({username,email,password: hashedPassword});
    // @ts-ignore
    delete user.password;
    const token = genToken({ sub: user.id, email: user.email, username: user.username });
    res.cookie('token', token).status(HttpCode.CREATED).json({ error: false, message: 'Created user successfully', data: { ...user } });
  } catch (error) {
    if (error instanceof Error) return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Could not create user', serverMessage: error.message });

    console.log(error);
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = <User>req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(HttpCode.BAD_REQUEST).json({ error: true, message: 'Invalid credentials' });
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) return res.status(HttpCode.BAD_REQUEST).json({ error: true, message: 'Invalid credentials' }); 
    // @ts-ignore
    delete user.password;
    const token = genToken({ sub: user.id, email: user.email, username: user.username });
    res.cookie('token', token, {
      httpOnly: true, maxAge: 5 * 60 * 60 * 1000, sameSite: "lax"
    }).status(HttpCode.OK).json({ error: false, message: 'Welcome to streamify', data: { ...user } });
  } catch (error) {
    if (error instanceof Error) return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Could not create user', serverMessage: error.message });

    console.log(error);
  }
}

export const logout = (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    
  }
}

export const health = (req: Request, res: Response) => {
  res.status(HttpCode.OK)
}