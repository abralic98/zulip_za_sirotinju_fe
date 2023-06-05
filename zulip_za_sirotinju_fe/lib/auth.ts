import { GraphQLClient } from "graphql-request";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { AccountWithToken } from "@/types/auth";
import { routes } from "@/config/routes";
import {
  CreateSessionDocument,
  CreateSessionInput,
  MeDocument,
} from "@/src/generated/graphql";

const client = new GraphQLClient("http://localhost:4000/api/graphql");

const createSessionMutation = async (input: CreateSessionInput) => {
  const data = await client.request(CreateSessionDocument, {
    input: input,
  });
  return data.createSession;
};

const getMe = async () => {
  try {
    const user = await client.request(MeDocument);
    return user.me || null;
  } catch (err: unknown) {
    return null;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(input): Promise<AccountWithToken | null> {
        const credentials = input as CreateSessionInput;
        const { username, password } =
          (credentials as CreateSessionInput) || {};

        if (!username || !password) return null;

        const sessionToken = await createSessionMutation({
          username,
          password,
        });

        if (sessionToken?.token) {
          client.setHeader("authorization", `Bearer ${sessionToken?.token}`);
          const me = await getMe();

          if (me) {
            return {
              ...me,
              token: sessionToken.token,
            };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: routes.login,
  },
};

export default NextAuth(authOptions);
