import { LoginInput, RegisterInput } from "../models/auth.model";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma-client";
import generateToken from "../utils/token.utils";

export const createUser = async (input: RegisterInput) => {
  const email = input.email;
  const username = input.username;
  const password = input.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username:username,
      email:email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  return user;
};

export const login = async (input: LoginInput) => {
  const email = input.email.trim();
  const password = input.password.trim();

  const user = await prisma.user.findUnique({
    where: {
      email:email,
    },
    select: {
      email: true,
      username: true,
      password: true,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return {
        email: user.email,
        username: user.username,
        token: generateToken({username:user.username,email:user.email}),
      };
    }
  }

  return user;
};


export const getCurrentUser = async (username: string) => {
    
    const user = await prisma.user.findUnique({
        where: {
            username
        },
        select: {
            email: true,
            username: true,
        }

    })

    return user
  
  };