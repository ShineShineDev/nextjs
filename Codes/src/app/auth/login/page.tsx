'use client';

import { AuthForm } from '@/components/auth/auth-form';
import { zodResolver } from "@hookform/resolvers/zod"
import loginSchema from '@/types/login';
import * as z from "zod"
import { Button } from "@/components/ui/button"
import React from 'react';
import { useForm } from 'react-hook-form';
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
import { LoginAction } from '@/sever/auth-action';

const page = async () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        // defaultValues: {
        //     identity: "",
        //     password: "",
        // },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
    //    const {identity,password} = values;
       console.log(values)
       LoginAction(values)
    }

    return (
        <div className='px-3'>
            <div className=''>
                <AuthForm title={'Login to your account'} showProvider={true} footerLable={"Don't have an account"} footerHref={'/auth/register'} >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
