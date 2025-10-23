"use client";

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({
  progress,
  showPercentage = true,
  size = "md",
}: ProgressBarProps) {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "h-2";
      case "lg":
        return "h-4";
      default:
        return "h-3";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-notion-green";
    if (progress >= 50) return "bg-notion-blue";
    if (progress >= 25) return "bg-notion-yellow";
    return "bg-notion-red";
  };

  return (
    <div className="w-full">
      <div
        className={`w-full bg-notion-border rounded-full overflow-hidden ${getSizeClasses(
          size
        )}`}
      >
        <div
          className={`h-full transition-all duration-500 ease-out ${getProgressColor(
            progress
          )}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-notion-text-light">0%</span>
          <span className="text-xs text-notion-text-light">100%</span>
        </div>
      )}
    </div>
  );
}
