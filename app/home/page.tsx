import { useEffect } from "react"
import { useUsers } from "../hooks/useUsers";
import { PrismaClient } from "@prisma/client";



export async function Home() {

    // load users from API 
    // display users in a list



    const prisma = new PrismaClient();
        // fetch users in React server component without using any Hooks and useEffect
        const users = await prisma.users.findMany();

        //console.log(users);

    return(
        <div className="w-full h-screen bg-primary">
            test
            {/* <h1>{users.map(user => (
                <div key={user.id}>
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
                </div>
            ))}</h1> */}
        </div>
    )
    }

    export default Home;
