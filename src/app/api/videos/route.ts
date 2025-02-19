import { connectToDB } from "@/lib/setupDB"
import Video from "@/models/Video"
import { NextResponse } from "next/server"

// TODO: Implement pagination using aggregate-paginate-v2
export async function GET() {
	try {
		await connectToDB()
		const videos = await Video.find().sort({ createdAt: -1 }).lean()

		if (!videos || videos.length === 0) {
			return NextResponse.json([], { status: 200 })
		}

		return NextResponse.json(videos, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: "Failed to get videos" },
			{ status: 500 }
		)
	}
}
