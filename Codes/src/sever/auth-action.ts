"use server"
import loginSchema from '@/types/login';
import RegisterSchema from '@/types/register';
import { eq } from 'drizzle-orm';  // Import the eq function from drizzle-orm
import { revalidatePath } from "next/cache";
import { sql } from "@/db/index";  // Import the initialized db instance
import { users } from "@/db/schema";  // Import the usersTable directly
import bcrypt from 'bcryptjs'; // install bcryptjs if not yet installed
import { log } from 'console';


export async function LoginAction(data: loginSchema) {
    console.log(data);
    const { identity, password } = data;

    const list = await sql.select().from(users).where(eq(users.name, identity));
    const existingUser = list[0];
    if (!existingUser) {
        console.log("Username not found")
        return { error: "Username not found" };
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        console.log("Invalid password")
        return { error: "Invalid password" };
    }
    console.log("Login Success")
    return { success: { id: existingUser.id, username: existingUser.name } }
}

export async function RegisterAction(data: RegisterSchema) {
    console.log(data);
    const { username, identity, password } = data;
    // Check if username already exists
    const list = await sql.select().from(users).where(eq(users.name, username));
    const existingUser = list[0];

    if (existingUser) {
        return { error: "Username already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

    // Insert new user
    const result = await sql
        .insert(users)
        .values({
            name: username,
            email: identity,
            password: hashedPassword,
            status: 1
        });

    console.log('Inserted:', result);

    revalidatePath('/page');

    return { success: {} };
}