"use client"

export default function VideoUploadForm() {
    return (
        <div>
            <h2>Upload a video</h2>
            <form>
                <input type="file" accept="video/*" />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}