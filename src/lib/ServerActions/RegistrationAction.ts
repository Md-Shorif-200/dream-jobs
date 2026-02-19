"use server";
import argon2 from "argon2";

import { dbCollection, dbConnect } from "../mongodb";

interface registerDataType {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "applicant" | "employer";
}

export const RegistrationAction = async (data: registerDataType) => {
  try {
    const { name, userName, email, password, role } = data;

    const hashPassword = await argon2.hash(password);

    const userCollection = dbConnect(dbCollection.Users);

    const existingUser = await userCollection.findOne({ email: email });

    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    const result = await userCollection.insertOne({
      name,
      userName,
      email,
      password: hashPassword,
      role,
    });

    if (result.insertedId) {
      return { success: true, message: "User registered successfully" };
    } else {
      return { success: false, message: "Failed to register user" };
    }
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Server error" };
  }
};
