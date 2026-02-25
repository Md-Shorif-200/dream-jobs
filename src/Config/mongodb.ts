import { MongoClient, ServerApiVersion } from "mongodb";

export const dbCollection = {
  Users: "Users",
};

export const dbConnect = (collectionName: string) => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MongoDB URI is missing");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_NAME).collection(collectionName);
};
