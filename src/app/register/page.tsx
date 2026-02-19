"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { RegistrationAction } from "@/lib/ServerActions/RegistrationAction";
import { toast } from "sonner";

//--------------- types
interface RegisterFormType {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "applicant" | "employer";
}

const page = () => {
  const [formData, setFormData] = useState<RegisterFormType>({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const registerData = {
        name: formData.name.trim(),
        userName: formData.userName.trim(),
        email: formData.email.toLocaleLowerCase().trim(),
        password: formData.password,
        // confirmPassword : formData.confirmPassword,
        role: formData.role,
      };

      if (formData.password !== formData.confirmPassword)
        return alert("password does not match");

      const result =  await RegistrationAction(registerData);
      console.log(result);

       if(result.success == true) {
         toast.success(result.message)
       }else {
        toast.error(result.message)
       }
      

    } catch (error) {
       console.log(error);
       
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your Dream Job</CardTitle>

          <CardDescription>Create your account to get started</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* name  */}
            <div className="space-y-2">
              <Label htmlFor="">Your Name</Label>

              <Input
                id="name"
                value={formData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("name", e.target.value)
                }
                type="text"
                placeholder="Enter Your Full Name"
                required
              />
            </div>
            {/* user name  */}
            <div className="space-y-2">
              <Label htmlFor="">User Name</Label>

              <Input
                value={formData.userName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("userName", e.target.value)
                }
                id="userName"
                type="text"
                placeholder="Choose User Name"
                required
              />
            </div>
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

            {/* role selection */}

            <div className="space-y-2 w-full">
              <Label htmlFor="">I am a</Label>

              <Select
                value={formData.role}
                onValueChange={(value: "applicant" | "employer") =>
                  handleInputChange("role", value)
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="applicant">Applicant</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
            {/* confirm password  */}
            <div className="space-y-2">
              <Label htmlFor="">Confirm Password</Label>

              <Input
                value={formData.confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                id="confirmPassword"
                type="password"
                placeholder="Confirm Your Password"
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
                  href="/log-in"
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
