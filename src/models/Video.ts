import { VIDEO_DIMENSIONS } from "@/constant"
import mongoose, { Schema, model, models } from "mongoose"

export interface IVideo {
	_id?: mongoose.Types.ObjectId
	title: string
	description: string
	videoUrl: string
	thumbnailUrl: string
	control?: boolean
	transformation?: {
		width: number
		height: number
		quality: number
	}
	createdAt?: Date
	updatedAt?: Date
}

const VideoSchema = new Schema<IVideo>(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
		},
		videoUrl: {
			type: String,
			required: [true, "Video URL is required"],
			trim: true,
		},
		thumbnailUrl: {
			type: String,
			required: [true, "Thumbnail URL is required"],
			trim: true,
		},
		control: {
			type: Boolean,
			default: true,
		},
		transformation: {
			type: {
				width: {
					type: Number,
					default: VIDEO_DIMENSIONS.width,
				},
				height: {
					type: Number,
					default: VIDEO_DIMENSIONS.height,
				},
				quality: {
					type: Number,
					min: 1,
					max: 100,
				},
			},
		},
	},
	{
		timestamps: true,
	}
)

// if the model exists, use it, else create a new one
const Video = models.Video || model<IVideo>("Video", VideoSchema)

export default Video
