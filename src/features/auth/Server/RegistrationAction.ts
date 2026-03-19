"use server";
import argon2 from "argon2";

import { dbCollection, dbConnect } from "../../../Config/mongodb";
import { RegisterUserData, registerUserSchema } from "../auth.schema";
import { createSessionAndSetCookies } from "./use-case/session";



export const RegistrationAction = async (data: RegisterUserData) => {
  
  try {

     const res = registerUserSchema.safeParse(data);

if (!res.success) {
  console.log('server : ',res.error);
  return { success: false, message: res.error.issues[0].message };
}

const validateData = res.data;
    const { name, userName, email, password, role } = validateData;

    const hashPassword = await argon2.hash(password);

    const userCollection = dbConnect(dbCollection.Users);

    const existingUser = await userCollection.findOne({ 
      $or : [{email},{userName}]
     });

       if (existingUser) {
      if (existingUser.email === email) {
        return { success: false, message: "Email already exists" };
      }
      if (existingUser.userName === userName) {
        return { success: false, message: "Username already exists" };
      }
    }

    const result = await userCollection.insertOne({
      name,
      userName,
      email,
      password: hashPassword,
      role,
    });


 
    
    if (result.insertedId) {
      await createSessionAndSetCookies(result.insertedId.toString());
      return { success: true, message: "User registered successfully" };
    } else {
      return { success: false, message: "Failed to register user" };
    }
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Server error" };
  }
};
