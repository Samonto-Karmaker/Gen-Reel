import { IVideo } from "@/models/Video"

type FetchOptions = {
	method: "GET" | "POST" | "PUT" | "DELETE"
	headers?: Record<string, string>
	body?: any
}

// Omit is a utility type that creates a new type by excluding the specified properties from the original type.
// In this case, we are excluding the "_id" property from the IVideo type.
export type VideoFormData = Omit<IVideo, "_id">

class ApiClient {
	private async fetchData<T>(
		endpoint: string,
		options: FetchOptions = { method: "GET" }
	): Promise<T> {
		const { method, headers, body } = options

		const defaultHeaders = {
			"Content-Type": "application/json",
			...headers,
		}

		const response = await fetch(`/api${endpoint}`, {
			...options,
			method: method,
			headers: defaultHeaders,
			body: body ? JSON.stringify(body) : undefined,
		})

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(`Error ${response.status}: ${errorText}`)
		}

		return response.json()
	}

	async getVideos(): Promise<IVideo[]> {
		return this.fetchData<IVideo[]>("/videos")
	}

	async getVideo(id: string): Promise<IVideo> {
		return this.fetchData<IVideo>(`/videos/${id}`)
	}

	async createVideo(videoData: VideoFormData): Promise<IVideo> {
		return this.fetchData<IVideo>("/videos", {
			method: "POST",
			body: videoData,
		})
	}
}

// Use Singleton pattern to create a single instance of the ApiClient class that can be shared across the application.
const apiClient = new ApiClient()

export default apiClient
