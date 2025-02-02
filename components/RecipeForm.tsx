import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IRecipe } from "@/types/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "process";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().nonempty().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().nonempty().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  ingredients: z
    .array(
      z.object({
        name: z.string().nonempty(),
        quantity: z.string().nonempty(),
      }),
    )
    .min(1, {
      message: "Recipe must have at least 1 ingredient.",
    }),
  instructions: z.string().nonempty().min(3, {
    message: "Instructions must be at least 3 characters.",
  }),
  time: z.number().int().positive({
    message: "Time must be a positive integer.",
  }),
  difficulty: z.enum(["easy", "medium", "hard", "pro"]),
});

export type RecipeFieldsType = z.infer<typeof formSchema>;

export function RecipeForm() {
  const form = useForm<RecipeFieldsType>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const onSubmit = async (data: RecipeFieldsType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form
          className="flex flex-col space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormDescription>Add a title for the recipe.</FormDescription>
                <FormControl>
                  <Input {...field} id="title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormDescription>
                  Add a brief description of the recipe.
                </FormDescription>
                <FormControl>
                  <Textarea {...field} id="description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-start h-[100px]">
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-[70%]">
                    <FormLabel>Ingredient {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Quantity" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="self-center" variant="ghost" size="icon" onClick={() => remove(index)}>
                <TrashIcon />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ name: "", quantity: "" })}
          >
            + Add Ingredient
          </Button>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="instructions">Instructions</FormLabel>
                <FormDescription>
                  Add step by step instructions for the recipe.
                </FormDescription>
                <FormControl>
                  <Textarea {...field} id="instructions" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="time">Time</FormLabel>
                <FormDescription>
                  Add the approximate time in minutes required to prepare the
                  recipe.
                </FormDescription>
                <FormControl>
                  <Input {...field} id="time" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
                <FormDescription>
                  Choose the difficulty level of the recipe.
                </FormDescription>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr />
          <div className="flex justify-end gap-4">
            <Button size="lg" className="w-fit" type="submit">
              Submit
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-fit"
              type="reset"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
