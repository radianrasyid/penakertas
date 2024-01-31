import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/sign-in",
  },
  useSecureCookies: process.env.NODE_ENV === "production" ? true : false,
  trustHost: true,
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnAuthScreen = nextUrl.pathname.includes("sign-in");
      // const isOnDashboard =
      //   nextUrl.pathname.startsWith("/admin") || nextUrl.pathname === "/";
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL(`${nextUrl.basePath}/`, nextUrl));
      // }
      if (isOnAuthScreen) {
        if (isLoggedIn) {
          return Response.redirect(new URL(`${nextUrl.basePath}/`, nextUrl));
        }
        return false;
      }

      if (!isLoggedIn) {
        return Response.redirect(
          new URL(`${nextUrl.basePath}/sign-in`, nextUrl)
        );
      }
      return true;
    },
    jwt: ({ token, user, trigger, session }) => {
      if (!!user) {
        token.jwtToken = user.jwt;

        if (trigger === "update" && session) {
          token = {
            ...token,
            jwtToken: user.jwt,
            user: session,
          };
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user.jwt = token.jwtToken as string;
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
