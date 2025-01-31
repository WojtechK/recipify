import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { IRecipe } from "@/types/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "process";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: z.string().nonempty().min(3, {
        message: "Description must be at least 3 characters.",
    }),
    ingredients: z.array(
        z.object({
            name: z.string().nonempty(),
            quantity: z.string().nonempty(),
        })
    ).min(1, {
        message: "Recipe must have at least 1 ingredient.",
    }),
    instructions: z.string().nonempty().min(3, {
        message: "Instructions must be at least 3 characters.",
    }),
    time: z.number().int().positive({
        message: "Time must be a positive integer.",
    }),
    difficulty: z.enum(["easy", "medium", "hard", "pro"]),
    authorId: z.number().optional(),
});

export type RecipeFieldsType = z.infer<typeof formSchema>;

export function RecipeForm() {
    const form = useForm<RecipeFieldsType>({
        resolver: zodResolver(formSchema),
      });


    return (
        <div className="flex flex-col gap-8">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <FormControl>
                                <Input {...field} id="title" />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


<Button
          className="w-fit"
        >
          Submit
        </Button>
                </Form>
            
        </div>
    )
}
