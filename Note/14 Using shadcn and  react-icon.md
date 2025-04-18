#### Install shadcn (https://ui.shadcn.com/docs/installation/next)

- Run the `init` command to create a new Next.js project or to setup an existing one

  ```
  npx shadcn@latest init
  ```

#### Add  shadcn Components

```
npx shadcn@latest add button
```



#### Using shadcn Components
``` react
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```





---



#### Install react-icons

```
npm install react-icons --save
```



#### Usage react-icons

```react

import { FaBeer } from 'react-icons/fa';

class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}
```

