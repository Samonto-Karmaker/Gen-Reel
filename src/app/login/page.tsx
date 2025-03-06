"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useNotification } from "../components/Notification"

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { showNotification } = useNotification()

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		showNotification(`${email} ${password}`, "info")
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
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
								placeholder="mail@site.com"
							/>
						</div>
						<div>
							<label
								htmlFor="Password"
								className="block mb-2 text-lg font-medium"
							>
								Password
							</label>
							<input
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								placeholder="********"
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
