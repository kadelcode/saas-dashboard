/* Used to handle HTTP responses and requests */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Import Firebase authentication instance */
import { auth } from "@/lib/firebase"

/* This defines a middleware function named `middleware` that takes a `NextRequest`
object as an argument. Middleware functions in Next.js can modify the request or 
response objects before they reach the application logic.
*/
export function middleware(req: NextRequest) {
    const user = auth.currentUser; // Retrieves the currently authenticated user from Firebase `auth` instance.

    /* If there is not authenticated user and the requested
    URL path starts with /dashboard */
    if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    /* If the user is authenticated or the requested path does not start
    with `/dashboard`, the middleware calls `NextResponse.next() to pass
    control to the next middleware or the final request handler.
    */
    return NextResponse.next();
}

/* This configuration object specifies that the middleware should be applied to any
route that matches the pattern `/dashboard/:path*`. This means it will run for any URL
that starts with `/dashboard`, including nested routes.
*/
export const config = {
    matcher: ["/dashboard/:path*"],
}