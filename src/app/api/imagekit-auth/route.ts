import ImageKit from "imagekit"
import { NextResponse } from "next/server"

const imagekit = new ImageKit({
	publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
	urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})

export async function GET() {
	try {
		const authenticationParameters = imagekit.getAuthenticationParameters()
		return NextResponse.json(authenticationParameters)
	} catch (error) {
		console.error("Failed to authenticate with ImageKit", error)
		return NextResponse.json(
			{ error: "Failed to authenticate with ImageKit" },
			{ status: 500 }
		)
	}
}
