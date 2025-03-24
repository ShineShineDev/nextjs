##### Error Page

- In Next.js, an **error page** is a special page that is displayed when something goes wrong, such as when an error occurs during server-side rendering, a failed API request, or when a page cannot be found. Next.js provides built-in error handling mechanisms that you can customize to improve the user experience.

  



###### 

![](/home/dev/Documents/nextjs/imgs/error.png)

```
//app/dashboard/error.tsx
'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}


//app/dashoard/page.tsx
import { rejects } from "assert";
import Image from "next/image";
import Link from "next/link";
import { resolve } from "path";

export default async function dashboard() {
  const data = await new Promise(
    (reject) => setTimeout(() => reject("api fail"), 3000),
  );
  const res = await fetch(`https://...`)
  const api2 = await res.json()
 
  if (!api2.ok) {
    return 'There was an error.'
  }
  return (
    <div>
      dashoard
      <Link href="/blog/2323">Go to blog Detail</Link>
    </div>
  );
}

```





