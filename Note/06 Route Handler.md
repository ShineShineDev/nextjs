##### Route Handlers

- **Route handlers for API routes** can handle different HTTP methods and send responses like JSON data, error messages, etc.

  

  ```react
  // src/app/api/user/route.js
  
  export async function GET(req) {
    return new Response(JSON.stringify({ message: 'User data retrieved successfully' }), {
      status: 200,
    });
  }
  
  export async function POST(req) {
    const data = await req.json();
    return new Response(JSON.stringify({ message: 'User created successfully', data }), {
      status: 201,
    });
  }
  
  
  ```


> Now hit => http://localhost:3000/api/user



##### Key Points:

- **API route handlers** are typically placed inside the `pages/api/` directory.
- **Page route handlers** use `getServerSideProps`, `getStaticProps`, or `getInitialProps` to fetch data and control how a page is rendered on the server.
- **Route handlers for API routes** can handle different HTTP methods and send responses like JSON data, error messages, etc.





![](/home/dev/Documents/nextjs/imgs/route handler.png)
