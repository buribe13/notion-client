"use client";

import { motion } from "framer-motion";
import { PieChart, BarChart3, TrendingUp } from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

interface ProgressVisualizerProps {
  type: "donut" | "bar" | "line";
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export default function ProgressVisualizer({
  type,
  data,
}: ProgressVisualizerProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "donut":
        return <PieChart className="w-5 h-5" />;
      case "bar":
        return <BarChart3 className="w-5 h-5" />;
      case "line":
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <PieChart className="w-5 h-5" />;
    }
  };

  const renderChart = () => {
    switch (type) {
      case "donut":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <RechartsPieChart
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPieChart>
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#2383e2" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2383e2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-notion-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        {getIcon(type)}
        <h3 className="font-medium text-notion-text capitalize">
          {type} Chart
        </h3>
      </div>

      <div className="h-48">{renderChart()}</div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-notion-text">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-notion-text">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
