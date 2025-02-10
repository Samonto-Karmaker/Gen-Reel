import { Connection } from "mongoose"

// Next.js does not have a global object, so we need to declare it
declare global {
	// This is to add a new property to the global namespace
	// var => to keep it accessible globally across the entire project
	// let/const => would limit the scope to the block, making it inaccessible globally
	var mongoose: {
		connect: Connection | null
		promise: Promise<Connection> | null
	}
}

export {} // This ensures the file is treated as a module, preventing global scope pollution
