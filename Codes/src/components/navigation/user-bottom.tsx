"use client"
import { Session } from "next-auth";

import { signOut } from "next-auth/react";

import { Button } from "../ui/button";
import Link from "next/link";
import { LogInIcon, LogOutIcon } from "lucide-react";



const UserButton = ({ user }: Session) => {
    console.log(user)
    return (
        <div>
            {user?.name}
            {/* {user?.email}
            {user?.image} */}
            {
                user?.email ?
                    (<Button onClick={() => signOut()} className="text-white" variant={'destructive'}>
                        <LogOutIcon></LogOutIcon>
                        Logout
                    </Button>
                    ) :
                    (
                        <Button asChild variant={'default'} >
                            <Link href={"/api/auth/signin"}>
                                <LogInIcon></LogInIcon>
                                Login

                            </Link>
                        </Button>
                    )
            }
        </div>
    )
}
export default UserButton;