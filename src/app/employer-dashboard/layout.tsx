
import { getCurrentUser } from "@/features/auth/Server/auth.queries";
import { redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import EmployerSidebar from "@/features/employer/components/employer-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user =  await getCurrentUser();

   console.log(user)

     if(!user) return   redirect("/log-in")
     if(user?.role !== "employer") return   redirect("/dashboard")
     

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <div className="flex min-h-screen bg-background ">
      <EmployerSidebar />
      <main className="container mx-auto mt-5 ml-70 mr-5">{children}</main>
    </div>


      </body>
    </html>
  );
}
