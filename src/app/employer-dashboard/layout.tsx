
import { getCurrentUser } from "@/features/auth/Server/auth.queries";
import { redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";

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

     if(!user) return   redirect("/log-in")
     if(user?.role !== "employer") return   redirect("/dashboard")
     

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}


      </body>
    </html>
  );
}
