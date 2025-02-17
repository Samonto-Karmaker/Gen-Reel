import type { NextConfig } from "next"

// Define the Next.js configuration
const nextConfig: NextConfig = {
	/* config options here */
	images: {
		// Allow loading images from specific remote patterns
		remotePatterns: [
			{
				protocol: "https", // Protocol to use (https)
				hostname: "ik.imagekit.io", // Hostname to allow
				port: "", // Port (empty means default port)
			},
		],
	},
}

export default nextConfig
