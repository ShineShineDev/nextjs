"use client"

import { z } from "zod"

const loginSchema = z.object({
    identity: z.string().min(2).max(50),
    password: z.string().min(6)
});

export default loginSchema;