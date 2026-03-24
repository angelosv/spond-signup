type ProgressBarProps = {
    current: number
    total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = (current / total) * 100

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Step {current} of {total}</span>
                <span>{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-black h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}