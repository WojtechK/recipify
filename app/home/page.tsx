import { useEffect, useRef } from "react";
import { useUsers } from "../hooks/useUsers";
import { RecipeDialog } from "@/components/RecipeDialog";
import { PrismaClient } from "@prisma/client";
import { ModeToggle } from "@/components/ModeToggle";
import { Textarea } from "@/components/ui/textarea";

export async function Home() {
  const prisma = new PrismaClient();
  // fetch users in React server component without using any Hooks and useEffect
  const users = await prisma.users.findMany();

  return (
    <div className="w-full h-screen bg-background flex justify-center p-6">
      <header className="flex items-center justify-between w-full h-24">
        <div className="min-w-[360px]">
          <RecipeDialog />
        </div>
        <ModeToggle />                                                                    
      </header>
      <main>
{/* <RecipesList /> */}
      </main>
      
    </div>
  );
}

export default Home;
