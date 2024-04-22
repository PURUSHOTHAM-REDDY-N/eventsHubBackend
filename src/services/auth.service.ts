import { LoginInput, RegisterInput } from "../models/auth.model";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma-client";
import generateToken from "../utils/token.utils";
import { User } from "@prisma/client";

export const createUser = async (input: RegisterInput) => {
  const email = input.email;
  const username = input.username;
  const password = input.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
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
      email: email,
    }
  });



  if (user) {
    const match = await bcrypt.compare(password, user.password);
    let safeUser = JSON.parse(JSON.stringify(user), function(key, value) {
      if (key === "password") {
        return undefined;
      }
      return value;
    });
    if (match) {
      return safeUser;
    }
  }

  return user;
};

export const getCurrentUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      email: true,
      username: true,
    },
  });

  return user;
};

export const getAccountDetailsByAccountId = async (input: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: input,
    },
    include: {
      created_events: true,
    },
  });

  return user;
};

export const editUserProfile = async (input: User,id:string) => {
  const user = await prisma.user.update({
    where:{
      id:id
    },
    data: {
      dob: input.dob,
      country:input.country,
      image:input.image
    },
    select: {
      id: true,
    },
  });

  return user;
};
