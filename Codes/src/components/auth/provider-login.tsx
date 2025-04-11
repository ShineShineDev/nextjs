"use client"
import React from 'react'
import { Button } from '../ui/button'
import { GithubIcon, GoalIcon } from 'lucide-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export const ProviderLogin = () => {
  return (
    <div className='flex flex-col gap-1'>
      <Button onClick={()=>{ signIn("github",{
        redirectTo : "/"
      }) }} >Loing With Google <GoalIcon></GoalIcon> </Button>
      <Button onClick={()=>{signIn("github",{redirectTo : "/"})}}>Loing With GitHub <GithubIcon></GithubIcon> </Button>
    </div>
  )
}
