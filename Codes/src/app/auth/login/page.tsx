import { AuthForm } from '@/components/auth/auth-form';
import React from 'react'

const page = () => {
    return (
        <AuthForm children={undefined} title={'Login'} showProvider={false} footerLable={"Don't have an account"} footerHref={'/auth/register'}/>
    )
}

export default page;