import { getCurrentUser } from "@/features/auth/Server/auth.queries";


export const getCurrentEmployerDetails = async () => {
  const currentUser = await getCurrentUser();

  

  if (!currentUser) return null;

  if (currentUser.role !== "employer") return null;

  

};

