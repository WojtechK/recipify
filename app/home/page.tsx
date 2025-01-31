import { useEffect, useRef } from "react"
import { useUsers } from "../hooks/useUsers";
import { RecipeDialog } from "@/components/RecipeDialog";
import { PrismaClient } from "@prisma/client";
import { ModeToggle } from "@/components/ModeToggle";
import { Textarea } from "@/components/ui/textarea";



export async function Home() {

    const prisma = new PrismaClient();
    //     // fetch users in React server component without using any Hooks and useEffect
        const users = await prisma.users.findMany();


    return(
        <main className="w-full h-screen bg-background flex justify-center p-6">
            <header className="flex justify-between w-full h-24">
               
                    <div></div>
                    <div className="min-w-[360px]">
                        <RecipeDialog />
                    </div>
                    <div>
                        <ModeToggle />
                    </div>
            
            
            </header>
            
            
            {/* <RecipesList /> */}
          
        </main>
    )
    }

    export default Home;
