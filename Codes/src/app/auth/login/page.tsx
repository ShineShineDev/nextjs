import { AuthForm } from '@/components/auth/auth-form';
import React from 'react'
import { getData, deleteData, crateData } from "@/sever/action";  // Import the getData function
const page = async () => {
     const data = await getData();  // Fetch data using getData
    return (
        <div className='px-3'>
            <div className=''> 
                <AuthForm children={undefined} title={'Login to your account'} showProvider={true} footerLable={"Don't have an account"} footerHref={'/auth/register'} />
            </div>
        </div>
    )
}

export default page;