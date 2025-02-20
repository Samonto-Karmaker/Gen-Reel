import { NextRequest } from "next/server"
import { Types } from "mongoose"

export function getIdFromReq(req: NextRequest): string | null {
	const { pathname } = req.nextUrl
	const id = pathname.split("/").pop() || ""
	if (!Types.ObjectId.isValid(id)) {
		return null
	}
	return id
}
