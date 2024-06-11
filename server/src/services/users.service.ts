import { prisma } from "../config/client";
import { User } from "@prisma/client";

export const addUser = async (user: Omit<User, 'createdAt' | 'id'>): Promise<User> => {
  const newUser = await prisma.user.create({
    data: user
  });

  return newUser;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return user;
}