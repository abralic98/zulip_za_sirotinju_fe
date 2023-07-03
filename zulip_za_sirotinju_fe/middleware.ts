import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/app/:path*"] };

export async function middleware(request: NextRequest) {
  return

  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL || "";

  const redirect = () =>
    NextResponse.redirect(new URL(process.env.NEXTAUTH_URL || "", request.url));

  const token = request.cookies.get("next-auth.session-token")?.value;

  const requestBody = {
    query: `query {
      me {
         email
      }
    }`,
  };

  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  };

  try {
    const res = await (await fetch(endpoint, options)).json();
    if (!res.data.me) return redirect();
  } catch (error) {
    return redirect();
  }

  const response = NextResponse.next();
  return response;
}
