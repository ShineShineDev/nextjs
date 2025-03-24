

###### Parallel Routes

- Parallel Routes allows you to simultaneously or conditionally render one or more pages within the same layout. They are useful for highly dynamic sections of an app, such as dashboards and feeds on social sites.





![](/home/dev/Documents/nextjs/imgs/parallel routes.jpg)





##### Slot

Parallel routes are created using named **slots**. Slots are defined with the `@folder` convention. 

Slots are passed as props to the shared parent layout

```react
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
```





https://nextjs.org/docs/app/building-your-application/routing/parallel-routes