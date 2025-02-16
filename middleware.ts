import withAuth from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
	function middleware() {
		// This function will be called for each request
		// before the route handler is called
		return NextResponse.next()
	},
	// Optional options
	{
		callbacks: {
			authorized: ({ token, req }) => {
				// Return true if the user is authorized to access

				// Get the pathname of the next URL
				const { pathname } = req.nextUrl

				// Pages that do not require authentication
				// Auth related pages and routes
				if (
					pathname.startsWith("/api/auth") ||
					pathname === "/login" ||
					pathname === "/register"
				) {
					return true
				}

				// Public pages
				if (pathname === "/" || pathname === "/api/videos") {
					return true
				}

				// Pages that require authentication
				return !!token
			},
		},
	}
)

export const config = {
	/*
	 * Match all request paths except:
	 * - _next/static (static files)
	 * - _next/image (image optimization files)
	 * - favicon.ico (favicon file)
	 * - public folder
	 */
	matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}
