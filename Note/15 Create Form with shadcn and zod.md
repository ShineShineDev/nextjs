#### Define Register Validation  Type

```react
// src/types/register.ts
"use client"
import { z } from "zod"

const RegisterSchema = z.object({
    username: z.string().min(2).max(50),
    identity: z.string().min(2).max(50),
    password: z.string().min(6)
});
export default RegisterSchema;
```





#### Register Page

```react
// src/app/auth/register/page.tsx


"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterSchema from "@/types/register";
import { useForm } from "react-hook-form";
import * as React from "react"

import { getData, deleteData, crateData } from "@/sever/action";  // Import the getData function
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



const Registger = async () => {
   // Validation 
  const formVali = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    // defaultValues: {
    //   identity: "",
    //   password: "",
    // },
  })
  // Handel Form submit
  function registerNow(values: z.infer<typeof RegisterSchema>) {
    console.log(values)
  }
  return (
    <div className="px-3">
        <Form {...formVali}>
          <form onSubmit={form.handleSubmit(registerNow)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </AuthForm>
    </div >
  )
}
export default Registger;
```





#### Crate Login Validation Schema Type

```react
"use client"

import { z } from "zod"

const loginSchema = z.object({
    identity: z.string().min(2).max(50),
    password: z.string().min(6)
});

export default loginSchema;
```





#### Login Form

```react
'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import loginSchema from '@/types/login';
import * as z from "zod"
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const page = async () => {

    const loginVali = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        // defaultValues: {
        //     identity: "",
        //     password: "",
        // },
    })

    function loginNow(values: z.infer<typeof loginSchema>) {
        console.log(values)
    }

    return (
        <div className='px-3'>
            <div className=''>
                    <Form {...loginVali}>
                        <form onSubmit={form.handleSubmit(loginNow)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="identity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email or Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
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
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </AuthForm>
            </div>
        </div >
    )
}
export default page;

```

