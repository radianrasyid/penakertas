import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from "./auth.config";

export const {
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [Credentials({
        // authorize: async(credentials, request) => {
        //     const parsedCredentials = z.object({
        //         username: z.string(),
        //         password: z.string().min(8),
        //     }).safeParse(credentials);


        // }
    })]
})