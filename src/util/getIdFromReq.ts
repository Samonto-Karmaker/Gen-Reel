import { NextRequest } from "next/server"

export function getIdFromReq(req: NextRequest): string {
	const { pathname } = new URL(req.url)
	return pathname.split("/").pop() || ""
}
