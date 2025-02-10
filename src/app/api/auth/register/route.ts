import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User"
import { connectToDB } from "@/lib/setupDB"

export async function POST(request: NextRequest) {
	try {
		await connectToDB()

		const { fullName, email, password } = await request.json()
		if (!fullName || fullName.trim() === "") {
			return NextResponse.json(
				{ error: "Full Name is required" },
				{ status: 400 }
			)
		}
		if (!email || email.trim() === "") {
			return NextResponse.json({ error: "Email is required" }, { status: 400 })
		}
		if (!password || password.trim() === "") {
			return NextResponse.json(
				{ error: "Password is required" },
				{ status: 400 }
			)
		}

		const existingUser = await User.findOne({ email }).select("_id")
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			)
		}

		const newUser = new User({ fullName, email, password })
		await newUser.save()
		return NextResponse.json(
			{ message: "User created successfully" },
			{ status: 201 }
		)
	} catch (error) {
		console.error("Error in POST /api/auth/register", error)
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
	}
}
