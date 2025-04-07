### What is Auth.js

- Auth.js is a runtime agnostic library based on standard Web APIs that integrates deeply with multiple modern JavaScript frameworks to provide an authentication experience that’s simple to get started with, easy to extend, and always private and secure!

- ###### https://next-auth-example.vercel.app/auth/signin?callbackUrl=https%3A%2F%2Fnext-auth-example.vercel.app%2F





### Authentication methods

There are 4 ways to authenticate users with Auth.js:

- [OAuth authentication](https://authjs.dev/getting-started/authentication/oauth) (*Sign in with Google, GitHub, LinkedIn, etc…*)
- [Magic Links](https://authjs.dev/getting-started/authentication/email) (*Email Provider like Forward Email, Resend, Sendgrid, Nodemailer etc…*)
- [Credentials](https://authjs.dev/getting-started/authentication/credentials) (*Username and Password, Integrating with external APIs, etc…*)
- [WebAuthn](https://authjs.dev/getting-started/authentication/webauthn) (*Passkeys, etc…*)





### Official Providers

- Githuh
- Goolge
- Twitter
-  Apple
- Discord
- Auth0
- Facebook
- Keycloak



### 1 Install Package

```
 npm i next-auth@5.0.0-beta.25
```



### 2 Setup Environment

- Generate secret

  ``` cmd
  openssl rand -base64 33
  ```

- Add Secret Key in .env

  ```env
  AUTH_SECRET=4APp/nt+ElnvaAZp/6xsbRMe1c/2DGo5W2IfGY+FeBrh
  ```



### 3 Create the Auth.js config file

- Next, create the Auth.js config file and object. This is where you can control the behaviour of the library and specify custom authentication logic, adapters, etc. We recommend all frameworks to create an `auth.ts` file in the project. 

  ```react
  // src/sever/auth.ts
  import NextAuth from "next-auth"
   
  export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [],
  })
  ```

  

  
  
### 4 Add a Route Handler

- This file must be an App Router Route Handler, however, the rest of your app can stay under `page/` if you’d like.

  ```react
  // src/app/api/auth/[...nextauth]/route.ts
  
  import { handlers } from "@/sever/auth" // Referring to the auth.ts we just created
  export const { GET, POST } = handlers
  ```



### 5 Add optional Middleware to keep the session alive

- Add optional Middleware to keep the session alive, this will update the session expiry every time its called.

  ```react
  export { auth as middleware } from "@/auth"
  ```

  

### 6 Schema

- For Postgresql with Drizzle

  ```ts
  // src/db/schema.ts
  
  import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
  } from "drizzle-orm/pg-core"
  
  import type { AdapterAccountType } from "next-auth/adapters"
  
  export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
  })
  
  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => [
      {
        compoundKey: primaryKey({
          columns: [account.provider, account.providerAccountId],
        }),
      },
    ]
  )
  
  export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  })
  
  export const verificationTokens = pgTable(
    "verificationToken",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
      {
        compositePk: primaryKey({
          columns: [verificationToken.identifier, verificationToken.token],
        }),
      },
    ]
  )
  
  export const authenticators = pgTable(
    "authenticator",
    {
      credentialID: text("credentialID").notNull().unique(),
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      providerAccountId: text("providerAccountId").notNull(),
      credentialPublicKey: text("credentialPublicKey").notNull(),
      counter: integer("counter").notNull(),
      credentialDeviceType: text("credentialDeviceType").notNull(),
      credentialBackedUp: boolean("credentialBackedUp").notNull(),
      transports: text("transports"),
    },
    (authenticator) => [
      {
        compositePK: primaryKey({
          columns: [authenticator.userId, authenticator.credentialID],
        }),
      },
    ]
  )
  ```

- For mysqlTable with Drizzle

  ```ts
  import {
    boolean,
    int,
    timestamp,
    mysqlTable,
    primaryKey,
    varchar,
  } from "drizzle-orm/mysql-core"
  import mysql from "mysql2/promise"
  import { drizzle } from "drizzle-orm/mysql2"
  import type { AdapterAccountType } from "next-auth/adapters"
   
  export const connection = await mysql.createConnection({
    host: "host",
    user: "user",
    password: "password",
    database: "database",
  })
   
  export const db = drizzle(connection)
   
  export const users = mysqlTable("user", {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).unique(),
    emailVerified: timestamp("emailVerified", {
      mode: "date",
      fsp: 3,
    }),
    image: varchar("image", { length: 255 }),
  })
   
  export const accounts = mysqlTable(
    "account",
    {
      userId: varchar("userId", { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: varchar("type", { length: 255 })
        .$type<AdapterAccountType>()
        .notNull(),
      provider: varchar("provider", { length: 255 }).notNull(),
      providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
      refresh_token: varchar("refresh_token", { length: 255 }),
      access_token: varchar("access_token", { length: 255 }),
      expires_at: int("expires_at"),
      token_type: varchar("token_type", { length: 255 }),
      scope: varchar("scope", { length: 255 }),
      id_token: varchar("id_token", { length: 2048 }),
      session_state: varchar("session_state", { length: 255 }),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )
   
  export const sessions = mysqlTable("session", {
    sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  })
   
  export const verificationTokens = mysqlTable(
    "verificationToken",
    {
      identifier: varchar("identifier", { length: 255 }).notNull(),
      token: varchar("token", { length: 255 }).notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    })
  )
   
  export const authenticators = mysqlTable(
    "authenticator",
    {
      credentialID: varchar("credentialID", { length: 255 }).notNull().unique(),
      userId: varchar("userId", { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
      credentialPublicKey: varchar("credentialPublicKey", {
        length: 255,
      }).notNull(),
      counter: int("counter").notNull(),
      credentialDeviceType: varchar("credentialDeviceType", {
        length: 255,
      }).notNull(),
      credentialBackedUp: boolean("credentialBackedUp").notNull(),
      transports: varchar("transports", { length: 255 }),
    },
    (authenticator) => ({
      compositePk: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    })
  )
  ```




### 7 Install Driver Package

- For Drizzle

  ```bash
  npm install drizzle-orm @auth/drizzle-adapter
  ```

- For TypeORM

  ```bash
  npm install @auth/typeorm-adapter typeorm
  ```

- prisma

  ```bash
  npm install @prisma/client @auth/prisma-adapter
  npm install prisma --save-dev
  ```



### 8 Adapter Setup

- update `auth.ts` file

  ```ts
  // src/sever/auth.ts
  import NextAuth from "next-auth"
  import { DrizzleAdapter } from "@auth/drizzle-adapter"
  import { sql } from "@/db/index"
   
  export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(sql),
    secret : process.env.AUTH_SECRET,
    session: {strategy:"jwt"},
    providers: [],
  })
  
  
  ---------------
  
  // src/db/index.ts
  
  import 'dotenv/config';  // Make sure your environment variables are loaded
  import { drizzle } from 'drizzle-orm/node-postgres';  // Import drizzle ORM
  import * as schema from './schema';  // Import your schema
  
  // Initialize the database with your DATABASE_URL
  const db = drizzle(process.env.DATABASE_URL!);
  drizzle(db,{schema,logger:true})
  // Pass the schema to the db for defining the tables
  export const sql = db;  // Export the initialized db instance directly
  // export const sql = drizzle(db,{schema,logger:true})
  ```
  





### 9  Setup

- add Provider 

  - github

    ```
    AUTH_GITHUB_ID=Ov23liAKEnKUVASRJEil
    AUTH_GITHUB_SECRET=5a5ca3d75b801f028877b7c51bf2f9a9f5d176a8
    ```

> CallBack =>https://example.com/api/auth/callback/github

- Configuration

  ```react
  // src/sever/auth.ts
  import NextAuth from "next-auth"
  import { DrizzleAdapter } from "@auth/drizzle-adapter"
  import { sql } from "@/db/index"
  import GitHub from "next-auth/providers/github"
  
  export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(sql),
    secret : process.env.AUTH_SECRET,
    session: {strategy:"jwt"},
    providers: [
      GitHub
    ],
  })
  ```

  

http://192.168.110.204:3000/api/auth/signin









### migrate

````
npx drizzle-kit generate
npx drizzle-kit pull
npx drizzle-kit push

npx drizzle-kit migrate
````

