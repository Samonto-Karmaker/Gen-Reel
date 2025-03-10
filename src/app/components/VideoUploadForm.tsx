"use client"

import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import FileUploader from "./FileUploader"
import { useNotification } from "./Notification"

export default function VideoUploadForm() {
	const { showNotification } = useNotification()

	const handleUploadSuccess = (response: IKUploadResponse) => {
		showNotification("Video uploaded successfully.", "success")
	}

	const handleUploadProgress = (progress: number) => {}

	return (
		<form className="space-y-4">
			<div className="form-control">
				<label className="label">Title</label>
				<input type="text" className="input input-bordered" />
			</div>

			<div className="form-control">
				<label className="label">Description</label>
				<input type="text" className="input input-bordered" />
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
