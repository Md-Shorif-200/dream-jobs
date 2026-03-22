"use server";

import { dbCollection, dbConnect } from "@/Config/mongodb";
import { getCurrentUser } from "@/features/auth/Server/auth.queries";

import { redirect } from "next/navigation";
import { EmployerProfileData } from "../employers.schema";

export const updateEmployerProfileAction = async (
  data: EmployerProfileData,
) => {
  const user = await getCurrentUser();

  if (!user) redirect("/log-in");

  if (user.role !== "employer") {
    return { status: "FAILD", message: "Unauthorized Access" };
  }

try {
       const {
    companyName,
    // description,
    yearOfEstablishment,
    location,
    websiteUrl,
    organizationType,
    teamSize,
  } = data;

  const userId = user._id.toString();
  const userEmail = user.email;

  const EmployersCollection = dbConnect(dbCollection.Employers);

  const result = await EmployersCollection.insertOne({
     userId,
     userEmail,
     companyName,
    // description,
    yearOfEstablishment,
    location,
    websiteUrl,
    organizationType,
    teamSize,
  })


     if (result.insertedId) {
    
        return { status: 'SUCCESS', message: "Form Submited successfully" };
      } else {
        return { status: 'FAILD', message: "Failed to Submit " };
      }
    } catch (error) {
      console.error("Server error:", error);
      return { status: 'FAILD', message: "Server error" };
    }









};
