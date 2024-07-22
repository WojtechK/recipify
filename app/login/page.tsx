"use client";

import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type LoginFieldsType = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFieldsType>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFieldsType) => {
    try {
      setIsLoading(true);
      const response = await login(data);
      console.log(response);
      if (response.status === 200) {
        toast({
          title: "Logged in successfully",
          variant: "success",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-fit p-8 flex justify-center items-center">
        <CardContent>
          <Form {...form}>
            <h1 className="text-3xl text-center font-bold pb-8">Log In</h1>
            <form
              className="flex flex-col space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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

              <Button type="submit" isLoading={isLoading}>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
