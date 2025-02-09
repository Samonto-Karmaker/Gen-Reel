import mongoose from "mongoose";
import { DB_NAME } from "@/constant";

const MONGODB_URL = `${process.env.MONGODB_CONNECTION_STRING}/${DB_NAME}`;

// Setup the database connection
/*
    Next.js always runs on the edge,
    which means that the code is executed on the server and not on the client. 
    This means that the global object is shared across all requests. 
    This is why we can use the global object to store the database connection and 
    reuse it across requests.
*/
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { connect: null, promise: null };
}

export const connectToDB = async () => {
    if (cached.connect) {
        // If the connection is already cached, return it
        return cached.connect;
    }
    if (!cached.promise) {
        // If the connection is not cached and the promise is not set, create a new connection

        // opts are optional
        const opts = {
            bufferCommands: true, // Enable buffering of commands when the connection is down
            maxPoolSize: 10, // Set the maximum number of connections in the pool
        };

        // Connect to the database
        cached.promise = mongoose.connect(MONGODB_URL, opts).then(() => {
            console.log("Connected to the database");
            return mongoose.connection;
        });
    }

    // Now that the promise is set, wait for it to resolve
    try {
        cached.connect = await cached.promise;
        return cached.connect;
    } catch (error) {
        cached.promise = null;
        console.error("Error connecting to the database: ", error);
        throw error;
    }
}