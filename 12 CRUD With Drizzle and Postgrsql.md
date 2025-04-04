##### 

- Install  Package

  ```bash
  npm i drizzle-orm pg dotenv
  npm i -D drizzle-kit @types/pg
  ```


- .env 

  ```js
  //my-project/.env
  
  DATABASE_URL=postgresql://username:password@127.0.0.1/dbName
  
  # DB_DATABASE=dbName
  # DB_USERNAME=username
  # DB_PASSWORD=passwword
  ```

-  DB index file

  ```react
  //my-project/src/db/index.ts
  import 'dotenv/config'; 
  import { drizzle } from 'drizzle-orm/node-postgres'; 
  import * as schema from './schema';  
  
  // Initialize the database with your DATABASE_URL
  const db = drizzle(process.env.DATABASE_URL!);
  drizzle(db,{schema,logger:true})
  // Pass the schema to the db for defining the tables
  export const sql = db;  // Export the initialized db instance directly
  // export const sql = drizzle(db,{schema,logger:true})
  
  ```

- schema file

  ```react
  //my-project/src/db/schema.ts
  
  import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
  
  // Define the 'users' table schema
  export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    status: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
  });
  ```

- drizzle.config.ts

  ```react
  //my-project/drizzle.config.ts
  
  import 'dotenv/config';
  import { defineConfig } from 'drizzle-kit';
  
  export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.DATABASE_URL!,
    },
  });
  
  ```

- migrate

  ````
  npx drizzle-kit generate
  
  npx  drizzle-kit migrate
  
  npx  drizzle-kit push
  npx drizzle-kit pull
  ````

  







##### Create Sever Action

````react
// src/sever/action.ts

'use server'
import { sql } from "@/db/index";  // Import the initialized db instance
import { usersTable } from "@/db/schema";  // Import the usersTable directly
import { eq } from 'drizzle-orm';  // Import the eq function from drizzle-orm
import { revalidatePath } from "next/cache";

export async function getData() {
    const list = await sql.select().from(usersTable);  // Use the usersTable directly from the schema
    return list;
}

export async function crateData(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const age = formData.get("age");
    const result = await sql
        .insert(usersTable)
        .values({
            name,
            email,
            age: parseInt(age, 10),
            status : 1
        });

    console.log('Inserted:', result);
    revalidatePath("/page")
    return {success:{}};  // Return the result of the insert operation
}

export async function deleteData(formData: `FormData`) {

    const id = formData.get("id");
    console.table(id);

    if (!id || typeof id !== 'string') {
        throw new Error('Invalid ID provided');
    }

    const result = await sql
        .delete(usersTable)
        .where(eq(usersTable.id, id));

    console.log('Deleted:', result);

    revalidatePath("/page")
    return {success:{}};  // 
}
````







##### Show List and Delete List

```react
// src/app/page
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



###### Add

```react
// src/app/page
import { getData, deleteData, crateData } from "@/sever/action"; // Import the getData function
export default async function dashboard() {
    return (
        <div>
            <div className="modal fade" id="exampleModal" ria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action={crateData}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input  type="text"className="form-control" required name="name"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"> Email address</label>
                                    <input type="email" name="email" className="form-control"required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Age</label>
                                    <input type="number" name="age" className="form-control" required/>
                                </div>
                                <SubmitBtn />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// src/components/form-button.tsx
"use client"
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button  disabled={pending}>
      {pending ? "Submitting..." : "Click"}
    </button>
  );
};

export default SubmitBtn;
```



 

