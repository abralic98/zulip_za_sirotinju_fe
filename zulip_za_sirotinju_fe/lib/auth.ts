import { GraphQLClient } from "graphql-request"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const client = new GraphQLClient(process.env.NEXT_PUBLIC_URL as string)

const createSessionMutation = async (input: CreateSessionInput) => {
  const data = await client.request(CreateSessionDocument, {
    input: input,
  })
  return data.createSession
}

const getMe = async () => {
  try {
    const user = await client.request(MeDocument)
    return user.me || null
  } catch (err: unknown) {
    return null
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(input): Promise<AccountWithToken | null> {
        const credentials = input as CreateSessionInput
        const { email, password } = (credentials as CreateSessionInput) || {}

        if (!email || !password) return null

        const sessionToken = await createSessionMutation({
          email,
          password,
        })

        if (sessionToken?.token) {
          client.setHeader("authorization", `Bearer ${sessionToken?.token}`)
          const me = await getMe()

          if (me) {
            return {
              ...me,
              token: sessionToken.token,
            }
          }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },

  pages: {
    signIn: routes.login,
  },
}

export default NextAuth(authOptions)
