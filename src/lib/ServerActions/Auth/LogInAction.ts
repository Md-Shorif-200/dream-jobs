"use server";
import { dbCollection, dbConnect } from "@/Config/mongodb";
import argon2 from "argon2";
interface loginDataType {
  email: string;
  password: string;
}

export const LogInAction = async (data: loginDataType) => {
  try {
    const { email, password } = data;

    const userCollection = dbConnect(dbCollection.Users);

    const existingUser = await userCollection.findOne({ email });

    if (!existingUser) {
      return {
        success: false,
        message: "User not found. Please Create  a account!",
      };
    }

    const isValidPassword = await argon2.verify(
      existingUser.password,
      password,
    );

    if (!isValidPassword) {
      return {
        success: false,
        message: "invalid password",
      };
    }
    //  login success
    return {
      success: true,
      message: "Login successful",
      user: existingUser,
    };

  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
};
