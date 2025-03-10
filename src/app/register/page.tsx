"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useReducer } from "react"
import { useNotification } from "../components/Notification"

enum RegisterFields {
	UserName = "userName",
	Email = "email",
	Password = "password",
	ConfirmPassword = "confirmPassword",
}

interface RegisterState {
	userName: string
	email: string
	password: string
	confirmPassword: string
}

type RegisterAction =
	| { type: RegisterFields; payload: string }
	| { type: "RESET" }

const initialState: RegisterState = {
	userName: "",
	email: "",
	password: "",
	confirmPassword: "",
}

const reducer = (
	state: RegisterState,
	action: RegisterAction
): RegisterState => {
	switch (action.type) {
		case RegisterFields.UserName:
			return { ...state, userName: action.payload }
		case RegisterFields.Email:
			return { ...state, email: action.payload }
		case RegisterFields.Password:
			return { ...state, password: action.payload }
		case RegisterFields.ConfirmPassword:
			return { ...state, confirmPassword: action.payload }
		case "RESET":
			return initialState
		default:
			return state
	}
}

export default function Register() {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { showNotification } = useNotification()
	const router = useRouter()

	const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: e.target.name as RegisterFields, payload: e.target.value })
	}

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (state.password !== state.confirmPassword) {
			showNotification("Passwords do not match", "error")
			return
		}

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullName: state.userName,
					email: state.email,
					password: state.password,
				}),
			})

			const result = await response.json()
			if (!response.ok) {
				throw new Error(result.error)
			}

			showNotification("Registration successful! Please log in.", "success")
			router.push("/login")

			dispatch({ type: "RESET" })
		} catch (error) {
			showNotification(
				error instanceof Error ? error.message : "An error occurred",
				"error"
			)
			console.error(error)
		}
	}

	return (
		<div className="max-w-md mx-auto">
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h1 className="text-3xl font-bold mb-4">Register</h1>
					<form className="space-y-4" onSubmit={handleRegister}>
						<div>
							<label
								htmlFor="userName"
								className="block mb-2 text-lg font-medium"
							>
								User Name
							</label>
							<input
								id="userName"
								name="userName"
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="text"
								required
								placeholder="John Doe"
								pattern="[A-Za-z][A-Za-z0-9\-]*"
								minLength={3}
								maxLength={20}
								title="User Name must be between 3 and 20 characters long and can only contain letters, numbers, and hyphens"
								aria-label="User Name"
								value={state.userName}
								onChange={handleFieldChange}
							/>
						</div>
						<div>
							<label htmlFor="email" className="block mb-2 text-lg font-medium">
								Email
							</label>
							<input
								id="email"
								name="email"
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="email"
								required
								placeholder="mail@site.com"
								aria-label="Email"
								value={state.email}
								onChange={handleFieldChange}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block mb-2 text-lg font-medium"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="password"
								required
								placeholder="********"
								pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
								minLength={8}
								title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
								aria-label="Password"
								value={state.password}
								onChange={handleFieldChange}
							/>
						</div>
						<div>
							<label
								htmlFor="confirmPassword"
								className="block mb-2 text-lg font-medium"
							>
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="password"
								required
								placeholder="********"
								aria-label="Confirm Password"
								value={state.confirmPassword}
								onChange={handleFieldChange}
							/>
						</div>
						<button type="submit" className="btn btn-primary w-full">
							Register
						</button>
						<p className="text-center italic mt-4">
							Already have an account?{" "}
							<Link className="text-blue-500 hover:underline" href="/login">
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	)
}
