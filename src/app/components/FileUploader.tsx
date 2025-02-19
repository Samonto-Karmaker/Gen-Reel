"use client"

import { IKUpload } from "imagekitio-next"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface IfileUploaderProps {
	onSuccess: (res: IKUploadResponse) => void
	onProgress?: (progress: number) => void
	fileType?: "image" | "video"
}

export default function FileUploader({
	onSuccess,
	onProgress,
	fileType = "image",
}: IfileUploaderProps) {
	const [uploading, setUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const onError = (err: { message: string }) => {
		setError(err.message)
		setUploading(false)
	}

	const handleSuccess = (res: IKUploadResponse) => {
		setUploading(false)
		setError(null)
		onSuccess(res)
	}

	const onUploadStart = () => {
		setUploading(true)
		setError(null)
	}

	const onUploadProgress = (event: ProgressEvent) => {
		if (event.lengthComputable && onProgress) {
			const percentComplete = (event.loaded / event.total) * 100
			onProgress(Math.round(percentComplete))
		}
	}

	const validateFile = (file: File) => {
		if (fileType === "video") {
			if (!file.type.startsWith("video")) {
				setError("Invalid file type: Please upload a video file.")
				return false
			}
			if (file.size > 100 * 1024 * 1024) {
				setError("File size exceeds the limit of 100 MB.")
				return false
			}
		} else {
			const acceptedTypes = ["image/jpeg", "image/png", "image/webp"]
			if (!acceptedTypes.includes(file.type)) {
				setError("Invalid file type: Please upload an image file.")
				return false
			}
			if (file.size > 5 * 1024 * 1024) {
				setError("File size exceeds the limit of 5 MB.")
				return false
			}
		}
		return true
	}

	return (
		<div className="space-y-2">
			<IKUpload
				fileName={fileType === "image" ? "image" : "video"}
				useUniqueFileName={true}
				folder={fileType === "image" ? "/images" : "/videos"}
				accept={fileType === "image" ? "image/*" : "video/*"}
				className="file-input file-input-bordered w-full"
                onSuccess={handleSuccess}
                onError={onError}
                onUploadStart={onUploadStart}
                onUploadProgress={onUploadProgress}
                validateFile={validateFile}
			/>

			{uploading && (
				<div className="flex items-center gap-2 text-sm text-primary">
					<Loader2 className="w-4 h-4 animate-spin" />
					<span>Uploading...</span>
				</div>
			)}

			{error && <div className="text-error text-sm">{error}</div>}
		</div>
	)
}
