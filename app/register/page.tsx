"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as z from "zod";

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



const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

  };
  // bg-gradient-to-r from-cyan-500 to-violet-800
  return (
    <div
      className="flex justify-center items-center w-screen h-screen"
    >
     
      <Card className="w-fit p-8 flex justify-center items-center">
        <CardContent>
          <Form {...form}>
            <h1 className="text-3xl text-center font-bold pb-8">Register</h1>
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

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
