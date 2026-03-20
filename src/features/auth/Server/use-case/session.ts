"use server"
import crypto from "crypto";
import { getIPAddress } from "./locatioin";
import { cookies, headers } from "next/headers";
import { dbCollection, dbConnect } from "@/Config/mongodb";
import { SESSION_LIFETIME, SESSION_REFRESH_TIME } from "@/Config/constant";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

type creatSessionData = {
  token: string;
  userId: string | number | ObjectId;
  userAgent: string;
  ip: string;
};

const generateSessionToken = () => {
  return crypto.randomBytes(32).toString("hex").normalize();
};

const createUserSession = async ({
  token,
  userId,
  userAgent,
  ip,
}: creatSessionData) => {
  const sessionCollection = dbConnect(dbCollection.Sessions);
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  const result = await sessionCollection.insertOne({
    id: hashedToken,
    userId,
    expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000),
    userAgent,
    ip,
  });

  return result;
};

export const createSessionAndSetCookies = async (userId: string | number) => {
  const token = generateSessionToken();
  const ip = await getIPAddress();
  const headersList = await headers();

  await createUserSession({
    token,
    userId: new ObjectId(String(userId)),
    userAgent: headersList.get("user-agent") || "",
    ip,
  });

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    secure: true,
    httpOnly: true,
    maxAge: SESSION_LIFETIME,
  });
};

// export const validateSessionAndGetUser = async (session: string) => {
//   const sessionCollection = dbConnect(dbCollection.Sessions);
//   const userCollection = dbConnect(dbCollection.Users);

//   const hashedToken = crypto
//     .createHash("sha-256")
//     .update(session)
//     .digest("hex");

//   // 2. find session
//   const existingSession = await sessionCollection.findOne({
//     id: hashedToken,
//   });

//   if (!existingSession) {
//     return null;
//   }

//   // 3. expire check
//   if (new Date(existingSession.expiresAt) < new Date()) {
//     await sessionCollection.deleteOne({ id: hashedToken });
//     return null;
//   }

//    //  3. SLIDING SESSION (AUTO REFRESH)
//   if (
//     Date.now() >=
//     new Date(existingSession.expiresAt).getTime() -
//       SESSION_REFRESH_TIME * 1000
//   ) {
//     const newExpiry = new Date(Date.now() + SESSION_LIFETIME * 1000);

//     await sessionCollection.updateOne(
//       { id: hashedToken },
//       {
//         $set: { expiresAt: newExpiry },
//       }
//     );

//     existingSession.expiresAt = newExpiry;
//   }

//   // 4. find user

//   const user = await userCollection.findOne({
//     _id: new ObjectId(existingSession.userId),
//   });

//   if (!user) {
//     return null;
//   }

//   return {
//     user,
//     session: existingSession,
//   };
// };

export const validateSessionAndGetUser = async (session: string) => {
  const sessionCollection = dbConnect(dbCollection.Sessions);

  const hashedToken = crypto
    .createHash("sha-256")
    .update(session)
    .digest("hex");

  const result = await sessionCollection
    .aggregate([
      {
        $match: { id: hashedToken },
      },
      {
        $lookup: {
          from: "Users", // collection name
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // array → object
      },
      {
        $project: {
          // user fields
          id: "$user._id",
          name: "$user.name",
          userName: "$user.userName",
          role: "$user.role",
          phoneNumber: "$user.phoneNumber",
          email: "$user.email",
          avatarUrl: "$user.avatarUrl",
          createdAt: "$user.createdAt",
          updatedAt: "$user.updatedAt",

          // session nested object
          session: {
            id: "$id",
            expiresAt: "$expiresAt",
            userAgent: "$userAgent",
            ip: "$ip",
          },
        },
      },
    ])
    .toArray();

  const data = result[0];

  if (!data) return null;

  // expire check
  if (new Date(data.session.expiresAt) < new Date()) {
    deleteSession(hashedToken);
    return null;
  }

  return data;
};

// logout action
export const logOutAction = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return redirect("/log-in");
  }

  const hashedToken = crypto
    .createHash("sha-256")
    .update(session)
    .digest("hex");

  deleteSession(hashedToken);
  cookieStore.delete("session");
};

// delete session from db
const deleteSession = async (session: string) => {
  const sessionCollection = dbConnect(dbCollection.Sessions);
  await sessionCollection.deleteOne({ id: session });
};
