import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === "production" 
        ? "https://assignment-9-pet-adoption.vercel.app/api/auth" 
        : "http://localhost:3000/api/auth"
})
