"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useNotification } from "../components/Notification"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { showNotification } = useNotification()
	const router = useRouter()

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await signIn("credentials", {
				email,
				password,
				redirect: false,
			})

			if (response?.error) {
				showNotification(response.error, "error")
				setPassword("")
			} else {
				showNotification("Logged in successfully", "success")
				router.push("/")
			}
		} catch (error) {
			console.error(error)
			showNotification("Something went wrong", "error")
		}
	}

	return (
		<div className="max-w-md mx-auto">
			<div className="card w-100 bg-base-100 shadow-lg">
				<div className="card-body">
					<h1 className="text-3xl font-bold mb-4">Login</h1>
					<form className="space-y-4" onSubmit={handleLogin}>
						<div>
							<label htmlFor="email" className="block mb-2 text-lg font-medium">
								Email
							</label>
							<input
								id="email"
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
								placeholder="mail@site.com"
								aria-label="Email"
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
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								placeholder="********"
								aria-label="Password"
							/>
						</div>
						<button type="submit" className="btn btn-primary w-full">
							Login
						</button>
						<p className="text-center font-style: italic mt-4">
							Don&apos;t have an account?{" "}
							<Link className="text-blue-500 hover:underline" href="/register">
								Register
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	)
}
