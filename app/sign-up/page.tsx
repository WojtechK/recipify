"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "../hooks/useAuth";
import { WelcomeView } from "@/components/shared/WelcomeView";
import { Logo } from "@/components/shared/Logo";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type SignUpFieldsType = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFieldsType>({
    resolver: zodResolver(formSchema),
  });
  const { signUp } = useAuth();
  const { toast } = useToast();

  const onSubmit = async (data: SignUpFieldsType) => {
    try {
      setIsLoading(true);
      const response = await signUp<SignUpFieldsType>(data);

      console.log(response);
      if (response.status === 200) {
        toast({
          title: "User created successfully",
          variant: "success",
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <WelcomeView>
      <Card className="w-fit p-8 flex justify-center items-center animate-fade-in select-none">
        <CardContent>
          <Form {...form}>
          <Logo />
          <p className="text-center text-sm m-6">
            Sign up for an new account.
          </p>
            <form
              className="flex flex-col space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[300px]"
                        placeholder="enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[300px]"
                        placeholder="enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[300px]"
                        placeholder="enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button isLoading={isLoading} type="submit">
                SignUp
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      </WelcomeView>
  );
}
