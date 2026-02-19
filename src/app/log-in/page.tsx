"use client";
import {
  Card,

  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";



import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

//--------------- types
interface RegisterFormType {

  email: string;
  password: string;

}

const page = () => {
  const [formData, setFormData] = useState<RegisterFormType>({

    email: "",
    password: "",

  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);
    try {
    } catch (error) {}
  };
  
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your Dream </CardTitle>

          <CardDescription>Log In  to get started</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} action="" className="space-y-6">
         
            {/* email  */}
            <div className="space-y-2">
              <Label htmlFor="">Email</Label>

              <Input
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("email", e.target.value)
                }
                id="email"
                type="mail"
                placeholder="Enter Your Email"
                required
              />
            </div>

       

            {/* password  */}
            <div className="space-y-2">
              <Label htmlFor="">Password</Label>

              <Input
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("password", e.target.value)
                }
                id="password"
                type="password"
                placeholder="Enter Password"
                required
              />
            </div>
          

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?
                <Link
                  href="/register"
                  className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
