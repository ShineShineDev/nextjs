import { AuthForm } from '@/components/auth/auth-form';
import React from 'react'

const page = () => {
    return (
        <div className='px-3'>
            <div className=''> 
                <AuthForm children={undefined} title={'Login to your account'} showProvider={true} footerLable={"Don't have an account"} footerHref={'/auth/register'} />
            </div>
        </div>
    )
}

export default page;