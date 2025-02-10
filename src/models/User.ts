import mongoose, { Schema, model, models } from "mongoose"
import bcrypt from "bcryptjs"

// While creating user we won't have _id and timestamps, so it's optional
export interface IUser {
	_id?: mongoose.Types.ObjectId
	fullName: string
	email: string
	password: string
	createdAt?: Date
	updatedAt?: Date
	comparePassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<IUser>(
	{
		fullName: {
			type: String,
			required: [true, "Full Name is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: [true, "Email already exists"],
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
	},
	{
		timestamps: true,
	}
)

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next()
	}
	this.password = await bcrypt.hash(this.password, 10)
	next()
})

UserSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password)
}

// if the model exists, use it, else create a new one
const User = models.User || model<IUser>("User", UserSchema)

export default User
