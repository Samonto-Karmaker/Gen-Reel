import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDB } from "./setupDB"
import User from "@/models/User"

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
	/*
        Configure one or more authentication providers
        The CredentialsProvider is used for email and password authentication
        You can add more providers like Google, Facebook, etc.
        These providers require additional configuration (client ID, client secret, etc.)
	*/
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			// The authorize function is called when a user attempts to sign in
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing credentials")
				}

				try {
					await connectToDB()
					const user = await User.findOne({ email: credentials.email })
					if (!user) {
						throw new Error("User not found")
					}
					const isValid = await user.comparePassword(credentials.password)
					if (!isValid) {
						throw new Error("Invalid password")
					}
					// Return the user object if authentication is successful
					return {
						id: user._id.toString(),
						email: user.email,
						name: user.fullName,
					}
				} catch (error) {
					console.error(error)
					throw new Error("Authentication failed")
				}
			},
		}),
	],
	// Callbacks for handling JWT and session
	callbacks: {
		// The jwt callback is called when a JWT is created or updated
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		// The session callback is called when a session is checked or created
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
			}
			return session
		},
	},
	// Custom pages for sign-in and error
	pages: {
		signIn: "/login",
		error: "/login",
	},
	// Session configuration
	session: {
		strategy: "jwt", // Use JWT for session management
		maxAge: 30 * 24 * 60 * 60, // Session max age in seconds (30 days)
	},
	// Secret for signing the JWT
	secret: process.env.NEXT_AUTH_SECRET,
}
