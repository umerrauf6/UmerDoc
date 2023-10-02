import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// const jwt = require("jsonwebtoken");
const jose = require("jose");

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return NextResponse.json({ message: "Inavlid Token" }, { status: 304 });
    }
    const token = authHeader.split(" ")[1];

    const secret = new TextEncoder().encode(process.env.SECRETE_KEY);

    await jose.jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);
    return NextResponse.json({ error: "Token not valid" }, { status: 404 });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/updateuser", "/api/getdoctors"],
};
