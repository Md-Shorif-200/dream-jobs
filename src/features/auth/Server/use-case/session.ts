import crypto from "crypto";
import { getIPAddress } from "./locatioin";
import { headers } from "next/headers";
import { dbCollection, dbConnect } from "@/Config/mongodb";
import { SESSION_LIFETIME } from "@/Config/constant";



type creatSessionData = {
token: string;
userId: string;
userAgent: string;
ip : string
}


const  generateSessionToken = () => {
     return crypto.randomBytes(32).toString('hex').normalize()
}


const createUserSession = async ({
  token,
  userId,
  userAgent,
  ip
}: creatSessionData) => {

const sessionCollection = dbConnect(dbCollection.Sessions);
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  const result = await sessionCollection.insertOne({
    id : hashedToken,
    userId,
    expiresAt : new Date(Date.now() + SESSION_LIFETIME * 1000),
    userAgent,
    ip,
  });

  return result;
};


export const createSessionAndSetCookies  =  async (userId:string) => {
      const token = generateSessionToken();
  const ip = await getIPAddress();
  const headersList = await headers();

 await createUserSession({
    token,
    userId,
    userAgent: headersList.get("user-agent") || "",
    ip,
 })
}


