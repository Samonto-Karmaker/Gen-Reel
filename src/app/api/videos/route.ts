import { authOptions } from "@/lib/authOptions"
import { connectToDB } from "@/lib/setupDB"
import Video, { IVideo } from "@/models/Video"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

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
		console.error(`Failed to get videos: ${error}`)
		return NextResponse.json(
			{ message: "Failed to get videos" },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		const userSession = await getServerSession(authOptions)
		const user = userSession?.user
		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
		}

		const data: IVideo = await req.json()
		if (!data) {
			return NextResponse.json({ message: "Invalid request" }, { status: 400 })
		}
		if (
			!data.title ||
			!data.description ||
			!data.videoUrl ||
			!data.thumbnailUrl
		) {
			return NextResponse.json(
				{
					message:
						"Title, description, video URL and thumbnail URL are required",
				},
				{ status: 400 }
			)
		}

		await connectToDB()
		const newVideo = new Video({
			...data,
			control: data.control ?? true,
			transformation: {
				width: 1080,
				height: 1920,
				quality: data.transformation?.quality ?? 100,
			},
		})
		await newVideo.save()
		return NextResponse.json(newVideo, { status: 201 })
	} catch (error) {
		console.error(`Failed to create video: ${error}`)
		return NextResponse.json(
			{ message: "Failed to create video" },
			{ status: 500 }
		)
	}
}
