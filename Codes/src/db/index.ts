import 'dotenv/config';  // Make sure your environment variables are loaded
import { drizzle } from 'drizzle-orm/node-postgres';  // Import drizzle ORM
import * as schema from './schema';  // Import your schema

// Initialize the database with your DATABASE_URL
const db = drizzle(process.env.DATABASE_URL!);
drizzle(db,{schema,logger:true})
// Pass the schema to the db for defining the tables
export const sql = db;  // Export the initialized db instance directly
// export const sql = drizzle(db,{schema,logger:true})