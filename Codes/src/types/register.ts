"use client"

import { z } from "zod"

const RegisterSchema = z.object({
    username: z.string().min(2).max(50),
    identity: z.string().min(2).max(50),
    password: z.string().min(6)
});

export default RegisterSchema;