"use client";

import { CheckCircle, Circle, AlertCircle, Clock } from "lucide-react";

interface StatusIndicatorProps {
  status: string;
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Completed",
          color: "text-notion-green",
          bgColor: "bg-green-100",
        };
      case "in-progress":
        return {
          icon: <Clock className="w-4 h-4" />,
          text: "In Progress",
          color: "text-notion-blue",
          bgColor: "bg-blue-100",
        };
      case "planning":
        return {
          icon: <Circle className="w-4 h-4" />,
          text: "Planning",
          color: "text-notion-yellow",
          bgColor: "bg-yellow-100",
        };
      case "on-hold":
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: "On Hold",
          color: "text-notion-red",
          bgColor: "bg-red-100",
        };
      default:
        return {
          icon: <Circle className="w-4 h-4" />,
          text: "Unknown",
          color: "text-notion-text-light",
          bgColor: "bg-gray-100",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`flex items-center space-x-2 px-3 py-1 rounded-full ${config.bgColor}`}
    >
      <div className={config.color}>{config.icon}</div>
      <span className={`text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
}
