##### Drizzle ORM

-  **Drizzle ORM** is a modern, lightweight Object-Relational Mapping (ORM) library for working with SQL databases in JavaScript and TypeScript environments. 
- It is designed to offer a simple and efficient way to interact with databases by allowing developers to write SQL queries using JavaScript/TypeScript syntax.





##### Key features

- **Type Safety**: Drizzle ORM offers strong TypeScript support, ensuring that your queries and models are type-safe.
- **Lightweight**: It is focused on being minimalistic and avoids the overhead that comes with some other ORMs, making it faster and more efficient.
- **Database Agnostic**: While Drizzle ORM is optimized for working with SQL databases, it can work with different kinds of SQL databases like PostgreSQL, MySQL, and SQLite.
- **Schema-based**: It allows developers to define models and queries in a more schema-driven way.





##### Install  Package

- Drizzle has native support for PostgreSQL connections with the `node-postgres` and `postgres.js` drivers.

  ```bash
  npm i drizzle-orm pg dotenv
  npm i -D drizzle-kit @types/pg
  ```

  

##### Setting Up

- .env 

  ```js
  //my-project/.env
  
  DATABASE_URL=postgresql://username:password@127.0.0.1/dbName
  
  # DB_DATABASE=dbName
  # DB_USERNAME=username
  # DB_PASSWORD=passwword
  ```

- DB index file

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
  
  





###### migrate

````
npx drizzle-kit generate

npx  drizzle-kit migrate

npx  drizzle-kit push
npx drizzle-kit pull
````

