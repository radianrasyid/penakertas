import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { POSTLoginUser } from "./services/user/api";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      authorize: async (credentials) => {
        const { password, username } = credentials as {
          username: string;
          password: string;
        };
        const resLogin: {
          status: "success" | "failed";
          message: string;
          data?: string;
        } = await POSTLoginUser({
          username,
          password,
        });

        console.log("ini masokkkk", resLogin);

        if (resLogin.data == undefined) return null;

        const response = (await jwtDecode(resLogin.data)) as {
          id: string;
          fullname: string;
          username: string;
          email: string;
          image: string;
        };

        return {
          id: response.id,
          email: response.email,
          image: response.image,
          name: response.fullname,
          jwt: resLogin.data,
          username: response.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
});
