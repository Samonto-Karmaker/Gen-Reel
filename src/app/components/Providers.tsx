"use client"

import { ImageKitProvider } from "imagekitio-next"
import { SessionProvider } from "next-auth/react"
import { NotificationProvider } from "./Notification"
import { ThemeProvider } from "./Theme"

const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
const authenticator = async () => {
	try {
		const response = await fetch("/api/imagekit-auth")

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(
				`Request failed with status ${response.status}: ${errorText}`
			)
		}

		const data = await response.json()
		const { signature, expire, token } = data
		return { signature, expire, token }
	} catch (error) {
		console.error(error)
		throw new Error("Imagekit Authentication request failed")
	}
}

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider refetchInterval={5 * 60}>
			<NotificationProvider>
				<ThemeProvider>
					<ImageKitProvider
						urlEndpoint={urlEndpoint}
						publicKey={publicKey}
						authenticator={authenticator}
					>
						{children}
					</ImageKitProvider>
				</ThemeProvider>
			</NotificationProvider>
		</SessionProvider>
	)
}
