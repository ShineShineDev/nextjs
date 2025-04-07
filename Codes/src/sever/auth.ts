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
    GitHub({
      clientId:process.env.AUTH_GITHUB_ID,
      clientSecret:process.env.AUTH_GITHUB_SECRET
    })
  ],
})
ddd