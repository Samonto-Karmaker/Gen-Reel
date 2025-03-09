"use client"
import Link from "next/link"

export default function Register() {
	return (
		<div className="max-w-md mx-auto">
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h1 className="text-3xl font-bold mb-4">Register</h1>
					<form className="space-y-4">
						<div>
							<label htmlFor="userName" className="block mb-2 text-lg font-medium">
								User Name
							</label>
							<input
								id="userName"
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="text"
								required
								placeholder="John Doe"
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength={3}
                                maxLength={20}
                                title="User Name must be between 3 and 20 characters long and can only contain letters, numbers, and hyphens"
                                aria-label="User Name"
							/>
						</div>
						<div>
							<label htmlFor="email" className="block mb-2 text-lg font-medium">
								Email
							</label>
							<input
								id="email"
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="email"
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
								required
								placeholder="********"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                minLength={8}
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
								aria-label="Password"
							/>
						</div>
                        <div>
							<label
								htmlFor="ConfirmPassword"
								className="block mb-2 text-lg font-medium"
							>
								Confirm Password
							</label>
							<input
								id="ConfirmPassword"
								className="w-full px-3 py-2 border-2 border-black rounded-lg"
								type="password"
								required
								placeholder="********"
								aria-label="Confirm Password"
							/>
						</div>
                        <button type="submit" className="btn btn-primary w-full">
							Register
						</button>
						<p className="text-center font-style: italic mt-4">
							Don&apos;t have an account?{" "}
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
