import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/sign-in",
  },
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
    jwt: ({ token, user }) => {
      if (!!user) {
        token.jwtToken = user.jwt;
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
