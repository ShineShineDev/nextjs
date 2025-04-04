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