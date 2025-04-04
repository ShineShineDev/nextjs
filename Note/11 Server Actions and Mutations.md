### Server Actions and Mutations

- [Server Actions](https://react.dev/reference/rsc/server-actions) are **asynchronous functions** that are executed on the server. They can be called in Server and Client Components to handle form submissions and data mutations in Next.js applications.





#### Crating new Server Action with separate file

````react
// src/sever/action.ts

'use server'
import { redirect } from 'next/navigation'
import { sql } from "@/db/index";  // Import the initialized db instance
import { usersTable } from "@/db/schema";  // Import the usersTable directly
import { eq } from 'drizzle-orm';  // Import the eq function from drizzle-orm
import { revalidatePath } from "next/cache";

export async function getData() {
    const list = await sql.select().from(usersTable); 
    //revalidatePath("/page")
    //redirect('/dashboard')
    return {success:{list}};
}

export async function deleteData(formData: FormData) {
    const id = formData.get("id");
    const result = await sql
        .delete(usersTable)
        .where(eq(usersTable.id, id));
    revalidatePath("/page")
    return {success:{}};  // 
}
````



#### Crating new Inline Server Action 

```react
// src/app/page.tsx

export default function Page() {
  // Server Action
  async function create() {
    'use server'
    // Mutate data
  }
  return '...'
}
```





#### Use Crated Server Action

```react
// src/app/page/page.tsx
import { getData, deleteData, crateData } from "@/sever/action";  // Import the getData function

export default async function dashboard() {
  const data = await getData(); 
  return (
    <div>
    {data.map((dt: any, index: number) => {
      return (
        <tr key={index}>
          <td>{dt.name}</td>
          <td>{dt.age}</td>
          <td>{dt.status}</td>
          <td>{dt.email}</td>
          <td>
            <form action={deleteData}>
              <input readOnly hidden name="id" value={dt.id} />
              <button className="btn btn-sm border">Del</button>
            </form>
          </td>
        </tr>
      );
    })}
    </div>
  );
}
```





#### useFormStatus with Server Action

- you can use the [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) hook to show a loading indicator while the action is being executed. When using this hook, you'll need to create a separate component to render the loading indicator. For example, to disable the button when the action is pending:

  ```react
   // app/ui/button.tsx
  
  'use client'
   
  import { useFormStatus } from 'react-dom'
   
  export function SubmitButton() {
    const { pending } = useFormStatus()
   
    return (
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    )
  }
  
  
  // app/ui/signup.tsx
  import { SubmitButton } from './button'
  import { createUser } from '@/app/actions'
   
  export function Signup() {
    return (
      <form action={createUser}>
        {/* Other form elements */}
        <SubmitButton />
      </form>
    )
  }
  ```

  





#### Attach action on event

```react
// src/app/page.tsx

'use client'
 
import { publishPost, saveDraft } from './actions'
 
export default function EditPost() {
  return (
    <form action={publishPost}>
      <textarea
        name="content"
        onChange={async (e) => {
          await saveDraft(e.target.value)
        }}
      />
      <button type="submit">Publish</button>
    </form>
  )
}
```



#### Invoke a Server Action From useEffect

- You can use the React [`useEffect`](https://react.dev/reference/react/useEffect) hook to invoke a Server Action when the component mounts or a dependency changes. 

````react

'use client'
 
import { incrementViews } from './actions'
import { useState, useEffect } from 'react'
 
export default function ViewCount({ initialViews }: { initialViews: number }) {
  const [views, setViews] = useState(initialViews)
 
  useEffect(() => {
    const updateViews = async () => {
      const updatedViews = await incrementViews()
      setViews(updatedViews)
    }
 
    updateViews()
  }, [])
 
  return <p>Total Views: {views}</p>
}
````



#### Error Handling

```react
// app/actions.ts
'use server'
 
import { revalidatePath } from 'next/cache'
 import { revalidateTag } from 'next/cache'

export async function createPost() {
  try {
    // ...
  } catch (error) {
    // ...
  }
 
  revalidatePath('/posts')
  //revalidateTag('posts') // Update cached posts
  //redirect(`/post/${id}`) // Navigate to the new post page
}
```





#### Cookies

- You can `get`, `set`, and `delete` cookies inside a Server Action using the [`cookies`](https://nextjs.org/docs/app/api-reference/functions/cookies) API:

  ```react
   // app/actions.ts
  
  'use server'
   
  import { cookies } from 'next/headers'
   
  export async function exampleAction() {
    const cookieStore = await cookies()
   
    // Get cookie
    cookieStore.get('name')?.value
   
    // Set cookie
    cookieStore.set('name', 'Delba')
   
    // Delete cookie
    cookieStore.delete('name')
  }
  ```

  





#### [Server-side form validation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-form-validation)

- You can use the HTML attributes like `required` and `type="email"` for basic client-side form validation

- For more advanced server-side validation, you can use a library like [zod](https://zod.dev/) to validate the form fields before mutating the data:

  ````react
  'use server'
   
  import { z } from 'zod'
   
  const schema = z.object({
    email: z.string({
      invalid_type_error: 'Invalid Email',
    }),
  })
   
  export default async function createUser(formData: FormData) {
    const validatedFields = schema.safeParse({
      email: formData.get('email'),
    })
   
    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
   
    // Mutate data
  }
  ````

  



#### Authentication and authorization\

- You should ensure that the user is authorized to perform the action. For example:

  ```react
   // app/actions.ts
  
  
  'use server'
   
  import { auth } from './lib'
   
  export function addItem() {
    const { user } = auth()
    if (!user) {
      throw new Error('You must be signed in to perform this action')
    }
   
    // ...
  }
  ```

  



#### Allowed origins (advanced)

```react
 // next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
    },
  },
}
```



