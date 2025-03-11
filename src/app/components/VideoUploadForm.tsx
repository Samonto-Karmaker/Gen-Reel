"use client"

import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import FileUploader from "./FileUploader"
import { useNotification } from "./Notification"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import apiClient from "@/lib/apiClient"

interface IVideoFormData {
	title: string
	description: string
	videoUrl: string
	thumbnailUrl: string
}

export default function VideoUploadForm() {
	const [loading, setLoading] = useState(false)
	const [uploadedProgress, setUploadedProgress] = useState(0)
	const { showNotification } = useNotification()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IVideoFormData>({
		defaultValues: {
			title: "",
			description: "",
			videoUrl: "",
			thumbnailUrl: "",
		},
	})

	const handleUploadSuccess = (response: IKUploadResponse) => {
		setValue("videoUrl", response.filePath)
		setValue("thumbnailUrl", response.thumbnailUrl || response.filePath)
		showNotification("Video uploaded successfully.", "success")
	}

	const handleUploadProgress = (progress: number) => {
		setUploadedProgress(progress)
	}

	const onSubmit = async (data: IVideoFormData) => {
		if (!data.videoUrl) {
			showNotification("Please upload a video file.", "error")
			return
		}

		setLoading(true)
		try {
			await apiClient.createVideo(data)
			showNotification("Video uploaded successfully.", "success")

			setValue("title", "")
			setValue("description", "")
			setValue("videoUrl", "")
			setValue("thumbnailUrl", "")
			setUploadedProgress(0)
		} catch (error) {
			showNotification(error instanceof Error ? error.message : "Failed to Upload Video", "error")
			console.error("Failed to upload video", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="form-control">
				<label className="label">Title</label>
				<input
					type="text"
					className={`input input-bordered ${
						errors.title ? "input-error" : ""
					}`}
					{...register("title", { required: "Title is required" })}
				/>
				{errors.title && (
					<span className="text-error text-sm mt-1">
						{errors.title.message}
					</span>
				)}
			</div>

			<div className="form-control">
				<label className="label">Description</label>
				<input
					type="text"
					className={`input input-bordered ${
						errors.description ? "input-error" : ""
					}`}
					{...register("description", { required: "Description is required" })}
				/>
				{errors.description && (
					<span className="text-error text-sm mt-1">
						{errors.description.message}
					</span>
				)}
			</div>

			<div className="form-control">
				<label className="label">Upload Video</label>
				<FileUploader
					fileType="video"
					onSuccess={handleUploadSuccess}
					onProgress={handleUploadProgress}
				/>
				{uploadedProgress > 0 && (
					<div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
						<div
							className="bg-primary rounded-full h-2.5 transition-all duration-300"
							style={{ width: `${uploadedProgress}%` }}
						></div>
					</div>
				)}
			</div>

			<br className="my-8" />
			<button
				type="submit"
				className="btn btn-primary btn-block"
				disabled={loading || !uploadedProgress}
			>
				{loading ? (
					<>
						<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						Uploading...
					</>
				) : (
					"Upload Video"
				)}
			</button>
		</form>
	)
}
