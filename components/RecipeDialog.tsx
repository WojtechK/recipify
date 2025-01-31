"use client";

import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RecipeForm } from "./RecipeForm";

type ReceipeInputProps = {};

export function RecipeDialog() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submitNewRecipe = async () => {
    // const newRecipe = await prisma.recipes.create({
    // })
    //console.log(newRecipe);
  };

  return (
      <Dialog>
        <DialogTrigger className="w-[360px]">
          <Textarea
            ref={textareaRef}
            placeholder="Add new recipe."
            className="resize-none"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new recipe</DialogTitle>
            <DialogDescription>
                Add a new recipe by filling in the fields below
            </DialogDescription>
          </DialogHeader>
          <RecipeForm />
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}
