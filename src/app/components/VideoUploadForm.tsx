"use client"

import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import FileUploader from "./FileUploader"
import { useNotification } from "./Notification"
import { useForm } from "react-hook-form"

interface IVideoFormData {
	title: string
	description: string
	videoUrl: string
	thumbnailUrl: string
}

export default function VideoUploadForm() {
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
		showNotification("Video uploaded successfully.", "success")
	}

	const handleUploadProgress = (progress: number) => {}

	const onSubmit = (data: IVideoFormData) => {
		showNotification("Video uploaded successfully.", "success")
		console.log(data)
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
			</div>

			<br className="my-8" />
			<button type="submit" className="btn btn-primary btn-block">
				Upload
			</button>
		</form>
	)
}
