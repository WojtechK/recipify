"use client";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useEffect } from "react";

export const SomeRandomSvgIcon = () => {
  return (
    <svg
      className="w-6 h-6 text-zinc-900 dark:text-zinc-50"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M0 0h24v24H0z" stroke="none" />
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2l4-4" />
    </svg>
  );
};

const LoginPage = () => {
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <Card className=" w-fit p-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">Google</Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <SomeRandomSvgIcon />
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
