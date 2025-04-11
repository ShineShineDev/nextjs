"use client"
import { Session } from "next-auth";

import { signOut } from "next-auth/react";

import { Button } from "../ui/button";
import Link from "next/link";
import { LogInIcon, LogOutIcon, User2Icon } from "lucide-react";



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
                        <div className="flex gap-1">
                            <Button variant={'default'} style={{ width: 'auto' }}>
                                <Link href={"/auth/login"} className="flex">
                                    <LogInIcon></LogInIcon>
                                    Login
                                </Link>
                            </Button>
                            <Button variant={'default'} style={{ width: 'auto' }}>
                                <Link href={"/auth/register"} className="flex">
                                    <User2Icon></User2Icon>
                                    Register
                                </Link>
                            </Button>
                        </div>
                    )
            }
        </div>
    )
}
export default UserButton;