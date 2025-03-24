##### Middleware



- Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.



##### Use Cases

- Authentication and Authorization: Ensure user identity and check session cookies before granting access to specific pages or API routes.
- Server-Side Redirects: Redirect users at the server level based on certain conditions (e.g., locale, user role).
- Path Rewriting: Support A/B testing, feature rollouts, or legacy paths by dynamically rewriting paths to API routes or pages based on request properties.
- Bot Detection: Protect your resources by detecting and blocking bot traffic.
- Logging and Analytics: Capture and analyze request data for insights before processing by the page or API.
- Feature Flagging: Enable or disable features dynamically for seamless feature rollouts or testing.

Recognizing situations where middleware may not be the optimal approach is just as crucial. Here are some scenarios to be mindful of:

- Complex Data Fetching and Manipulation: Middleware is not designed for direct data fetching or manipulation, this should be done within Route Handlers or server-side utilities instead.
- Heavy Computational Tasks: Middleware should be lightweight and respond quickly or it can cause delays in page load. Heavy computational tasks or long-running processes should be done within dedicated Route Handlers.
- Extensive Session Management: While Middleware can manage basic session tasks, extensive session management should be managed by dedicated authentication services or within Route Handlers.
- Direct Database Operations: Performing direct database operations within Middleware is not recommended. Database interactions should be done within Route Handlers or server-side utilities.





##### Crate Middle-ware

- Use the file `middleware.ts` (or `.js`) in the root of your project to define Middleware. 

- The middleware file should be in the root of your project (or inside the `/src` folder if you're using `src/`).

  ```react
  // my-project/src/middleware.ts
  import { NextResponse } from 'next/server';
  import type { NextRequest } from 'next/server';
  
  export function middleware(request: NextRequest) {
      console.log("middleware running...");
      return NextResponse.redirect(new URL('/', request.url));
  }
  
  export const config = {
      matcher: '/about/:path*', 
  };
  
  ```

  

###### Matcher

- `matcher` allows you to filter Middleware to run on specific paths.

  ```react
  export const config = {
      matcher: '/about/:path*',
  }
  ```
  
 - You can match a single path or multiple paths with an array syntax

   ```react
   export const config = {
       matcher: ['/about/:path*', '/dashboard/:path*'],
   }
   ```

 - The matcher config allows full **regex** so matching like negative lookaheads or character matching is supported

   ```react
   export const config = {
     matcher: [
       /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico, sitemap.xml, robots.txt (metadata files)
        */
       '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
     ],
   }
   ```

 - You can also bypass Middleware for certain requests by using the missing or has arrays, or a combination of both

   ```react
   export const config = {
     matcher: [
       /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico, sitemap.xml, robots.txt (metadata files)
        */
       {
         source:
           '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
         missing: [
           { type: 'header', key: 'next-router-prefetch' },
           { type: 'header', key: 'purpose', value: 'prefetch' },
         ],
       },
    
       {
         source:
           '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
         has: [
           { type: 'header', key: 'next-router-prefetch' },
           { type: 'header', key: 'purpose', value: 'prefetch' },
         ],
       },
    
       {
         source:
           '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
         has: [{ type: 'header', key: 'x-present' }],
         missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
       },
     ],
   }
   ```

   

  ##### Conditional Statements

```react
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}
```





###### NextResponse

The `NextResponse` API allows you to:

- `redirect` the incoming request to a different URL
- `rewrite` the response by displaying a given URL
- Set request headers for API Routes, `getServerSideProps`, and `rewrite` destinations
- Set response cookies
- Set response headers

To produce a response from Middleware, you can:

1. `rewrite` to a route ([Page](https://nextjs.org/docs/app/api-reference/file-conventions/page) or [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)) that produces a response
2. return a `NextResponse` directly. See [Producing a Response](https://nextjs.org/docs/app/building-your-application/routing/middleware#producing-a-response)



##### Using Cookies

Cookies are regular headers. On a `Request`, they are stored in the `Cookie` header. On a `Response` they are in the `Set-Cookie` header. Next.js provides a convenient way to access and manipulate these cookies through the `cookies` extension on `NextRequest` and `NextResponse`.

1. For incoming requests, `cookies` comes with the following methods: `get`, `getAll`, `set`, and `delete` cookies. You can check for the existence of a cookie with `has` or remove all cookies with `clear`.
2. For outgoing responses, `cookies` have the following methods `get`, `getAll`, `set`, and `delete`.

```react
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('nextjs')
  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll()
  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
 
  request.cookies.has('nextjs') // => true
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') // => false
 
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/',
  })
  cookie = response.cookies.get('vercel')
  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.
 
  return response
}
```







##### Setting Headers

- You can set request and response headers using the `NextResponse` API (setting *request* headers is available since Next.js v13.0.0)

  ```react
  import { NextResponse } from 'next/server'
  import type { NextRequest } from 'next/server'
   
  export function middleware(request: NextRequest) {
  	  const requestHeaders = new Headers(request.headers)
  
      requestHeaders.set('x-hello-from-middleware1', 'hello')
      requestHeaders.set('x-hello', 'Spidey 1')
   
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
  ```

  



##### CORS

- You can set CORS headers in Middleware to allow cross-origin requests, including [simple](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests) and [preflighted](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests) requests.

  ```react
  import { NextRequest, NextResponse } from 'next/server'
   
  const allowedOrigins = ['https://acme.com', 'https://my-app.org']
   
  const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
   
  export function middleware(request: NextRequest) {
    // Check the origin from the request
    const origin = request.headers.get('origin') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(origin)
   
    // Handle preflighted requests
    const isPreflight = request.method === 'OPTIONS'
   
    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
      }
      return NextResponse.json({}, { headers: preflightHeaders })
    }
   
    // Handle simple requests
    const response = NextResponse.next()
   
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
   
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
   
    return response
  }
   
  export const config = {
    matcher: '/api/:path*',
  }
  ```

  
