import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProviderLogin } from './provider-login'
import { AuthFooter } from './auth-footer'

type AuthFormPros = {
    children: React.ReactNode,
    title: string,
    showProvider: boolean,
    footerLable: string,
    footerHref: string
}


export const AuthForm = ({children,title,showProvider,footerHref,footerLable}: AuthFormPros) => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                <CardFooter>
                    {showProvider && <ProviderLogin/>}
                    <AuthFooter footerLable={footerLable} footerHref={footerHref}/>
                </CardFooter>
            </Card>
        </div>
    )
}
