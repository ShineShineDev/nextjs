### 001 Routing & Navigation

- Next.js uses **file-system based routing**, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.

  

  

  ![](/home/dev/Documents/nextjs/imgs/nested-layouts.jpg)






##### Crate Page

```react
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```



  

##### Creating a layout

-  Root Layout

```react
// app/src/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

##### Nesting layouts

````react
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
````





##### Linking between pages

- You can use the component to navigate between routes. `<Link>` is a built-in Next.js component that extends the HTML `<a>` tag to provide prefetching and client-side navigation.

  For example, to generate a list of blog posts, import `<Link>` from `next/link` and pass a `href` prop to the component:

  ```js
  import Link from 'next/link'
   
  export default async function Post({ post }) {
    const posts = await getPosts()
   
    return (
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    )
  }
  ```

  

  

