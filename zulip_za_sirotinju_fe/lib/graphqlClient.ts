import { GraphQLClient, RequestMiddleware } from "graphql-request"
import { getSession } from "next-auth/react"


// const endpoint = "http://localhost:4000/api/graphql"
const endpoint = process.env.NEXT_PUBLIC_GRAPHQL as string

const requestMiddleware: RequestMiddleware = async (request) => {
  const session = await getSession()

  const token = session?.user.token
  return {
    ...request,
    headers: { ...request.headers, authorization: `Bearer ${token}` },
  }
}

export const graphqlClient= new GraphQLClient(endpoint as string, { requestMiddleware })