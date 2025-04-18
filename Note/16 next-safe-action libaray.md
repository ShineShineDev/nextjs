## `next-safe-action`

- next-safe-action is a libary for Next.js(App Router) that helps you build secure, validated, and fully type-safe server actions.
- Think of it as as wrapper around Next.js's new server action.but with built-in input validation(via zod) and auto-type return values,making server-side logic safer and easier to manage.



### Why use it?

Without next-safe-action,you might:

- Accept raw form data(risk of bugs or abuse)
- Forget to validate input on the server
- Return inconsistent responses
- Write extra boilerplate for error handling

With next-safe-action,you get

- Input Validation with zod
- Type-safe function calls from client to server
- Built-in error handling
- Cleaner dev experience



### Core Features

| Feature                            | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| `action()`                         | Define a server action that can be safely called from the client |
| `internalAction()`                 | Server-only function with validation                         |
| `serverError()`                    | Return custom errors safely                                  |
| `.serverError`, `.validationError` | Easy error handling on client side                           |
| Full TypeScript support            | Auto-infers input/output types                               |



### Install It

```cmd
npm i next-safe-action
```



#### Create Next Safe Action

```react
'use server';

import { action } from 'next-safe-action';
import { z } from 'zod';

export const submitPost = action(
  z.object({
    title: z.string().min(3),
    content: z.string().min(10),
  }),
  async ({ title, content }) => {
    // Save to DB here
    return { success: true };
  }
);

```



### Using from client component

```react
'use client';

import { submitPost } from '@/app/actions/submitPost';

const handleClick = async () => {
  const result = await submitPost({ title: 'Hello', content: 'Some post content' });

  if (result.serverError) {
    console.error(result.serverError);
  } else {
    console.log('Post submitted!');
  }
};
```







### Create Safe Action Without next-safe-action Libaray

```react
// app/api/contact/route.ts
'use server';

import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = contactSchema.parse(data);

    // perform your action
    return new Response("Message received", { status: 200 });
  } catch (error) {
    return new Response("Invalid request", { status: 400 });
  }
}


const formSchema = z.object({
  name: z.string().min(1),
});

export async function submitFormAction(formData: FormData) {
  const data = {
    name: formData.get('name'),
  };

  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  // Now safe to use parsed.data
}

```



