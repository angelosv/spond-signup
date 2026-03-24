type BannerProps = {
    type: "info" | "success" | "error"
    message: string
}

export default function Banner({ type, message }: BannerProps) {
    const styles = {
        info: "bg-blue-50 text-blue-800 border-blue-200",
        success: "bg-green-50 text-green-800 border-green-200",
        error: "bg-red-50 text-red-800 border-red-200",
    }

    return (
        <div className={`border rounded-lg p-4 ${styles[type]}`}>
            {message}
        </div>
    )
}