##### Dynamic Route

- In Next.js, **Dynamic Routes** allow you to create pages with dynamic URL segments, which can be useful when you need to generate pages based on data like user IDs, blog post slugs, or any other parameter that can change based on the URL.

  Dynamic routes are defined by using **brackets** `[]` in the file name.



##### Key Point

- **Dynamic routes** are used to handle URL segments that change dynamically, like `id`, `slug`, etc.
- The dynamic parts of the route are marked by square brackets `[]`.
- You can retrieve the dynamic data from the URL using `useRouter`, `getStaticProps`, or `getServerSideProps`.



```react
import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <p>Post: {router.query.slug}</p>
}
```



| Route                  | Example URL | `params`        |
| ---------------------- | ----------- | --------------- |
| `pages/blog/[slug].js` | `/blog/a`   | `{ slug: 'a' }` |
| `pages/blog/[slug].js` | `/blog/b`   | `{ slug: 'b' }` |
| `pages/blog/[slug].js` | `/blog/c`   | `{ slug: 'c' }` |



