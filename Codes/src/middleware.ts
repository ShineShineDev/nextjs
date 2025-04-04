import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("middleware running...");
    // return NextResponse.redirect(new URL('/', request.url));
    

    // // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
    // // Getting cookies from the request using the `RequestCookies` API
    // let cookie = request.cookies.get('nextjs')
    // console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
    // const allCookies = request.cookies.getAll()
    // console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

    // request.cookies.has('nextjs') // => true
    // request.cookies.delete('nextjs')
    // request.cookies.has('nextjs') // => false

    // // Setting cookies on the response using the `ResponseCookies` API
    // const response = NextResponse.next()
    // response.cookies.set('vercel', 'fast')
    // response.cookies.set({
    //     name: 'vercel',
    //     value: 'fast',
    //     path: '/',
    // })
    // cookie = response.cookies.get('vercel')
    // console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
    // // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.

    // return response


    const requestHeaders = new Headers(request.headers)

    requestHeaders.set('x-hello-from-middleware1', 'hello')
    requestHeaders.set('x-hello', 'Spidey 1')
 
    // You can also set request headers in NextResponse.next
    const Hresponse = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    })
   
    // Set a new response header `x-hello-from-middleware2`
    Hresponse.headers.set('x-hello-from-middleware2', 'hello')
    Hresponse.headers.set('x-hello-2', 'Spidey 2')
    return Hresponse
}

export const config = {
    matcher: '/about/:path*',
};

