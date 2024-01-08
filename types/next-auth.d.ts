import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email?: string | null;
    image?: string | null;
    name?: string | null;
    jwt: string;
    username?: string | null;
    role?: "ADMIN" | "SUPER_ADMIN" | "USER";
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwtToken: string;
    refreshToken: string;
  }
}
