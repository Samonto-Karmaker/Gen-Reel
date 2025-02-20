import { connectToDB } from "@/lib/setupDB"
import Video from "@/models/Video"
import { getIdFromReq } from "@/util/getIdFromReq"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const id = getIdFromReq(req)
	if (!id) {
		return NextResponse.json({ message: "Invalid video id" }, { status: 400 })
	}

	try {
		await connectToDB()
		const video = await Video.findById(id).lean()
		if (!video) {
			return NextResponse.json({ message: "Video not found" }, { status: 404 })
		}
		return NextResponse.json(video, { status: 200 })
	} catch (error) {
		console.error(`Failed to get video: ${error}`)
		return NextResponse.json(
			{ message: "Failed to get video" },
			{ status: 500 }
		)
	}
}
