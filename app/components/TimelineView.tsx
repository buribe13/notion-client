"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  Circle,
  AlertCircle,
  TrendingUp,
  Play,
  Pause,
  CheckSquare,
  ArrowRight,
} from "lucide-react";
import StatusIndicator from "./StatusIndicator";
import ProgressBar from "./ProgressBar";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  progress: number;
  dueDate: string;
  priority: string;
  team: string[];
  description: string;
  tasks: Array<{ id: number; title: string; completed: boolean }>;
  budget: number;
  spent: number;
  timeline: string;
}

interface TimelineViewProps {
  projects: Project[];
  clientView: boolean;
}

export default function TimelineView({
  projects,
  clientView,
}: TimelineViewProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-notion-green" />;
      case "in-progress":
        return <Play className="w-4 h-4 text-notion-blue" />;
      case "planning":
        return <Circle className="w-4 h-4 text-notion-yellow" />;
      case "on-hold":
        return <Pause className="w-4 h-4 text-notion-red" />;
      default:
        return <Circle className="w-4 h-4 text-notion-text-light" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-300 bg-red-50";
      case "medium":
        return "border-yellow-300 bg-yellow-50";
      case "low":
        return "border-green-300 bg-green-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getProjectPosition = (project: Project) => {
    const startDate = new Date(project.dueDate);
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const dayOfMonth = startDate.getDate();
    const progress = project.progress / 100;

    return {
      left: `${(dayOfMonth / daysInMonth) * 100}%`,
      width: `${Math.max(10, progress * 200)}px`,
    };
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateTimelineDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg border border-notion-border overflow-hidden">
      {/* Timeline Header */}
      <div className="px-6 py-4 border-b border-notion-border bg-notion-gray">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-notion-text">
            Project Timeline
          </h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-3 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-notion-blue"
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-3 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-notion-blue"
            >
              {[2023, 2024, 2025].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="p-6">
        {/* Month Header */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-notion-text mb-2">
            {monthNames[selectedMonth]} {selectedYear}
          </h3>

          {/* Day Numbers */}
          <div className="flex border-b border-notion-border pb-2">
            {generateTimelineDays().map((day) => (
              <div
                key={day}
                className="flex-1 text-center text-sm text-notion-text-light min-w-[40px]"
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Projects Timeline */}
        <div className="space-y-4">
          {projects.map((project) => {
            const position = getProjectPosition(project);
            const projectDate = new Date(project.dueDate);
            const isInCurrentMonth =
              projectDate.getMonth() === selectedMonth &&
              projectDate.getFullYear() === selectedYear;

            if (!isInCurrentMonth) return null;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-48">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <h4 className="font-medium text-notion-text">
                        {project.name}
                      </h4>
                    </div>
                    <p className="text-sm text-notion-text-light">
                      {project.client}
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="relative h-8 bg-notion-gray rounded-lg overflow-hidden">
                      {/* Timeline Bar */}
                      <motion.div
                        className={`absolute top-0 h-full rounded-lg border-2 ${getPriorityColor(
                          project.priority
                        )}`}
                        style={{
                          left: position.left,
                          width: position.width,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: position.width }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="h-full flex items-center justify-center">
                          <span className="text-xs font-medium text-notion-text">
                            {project.progress}%
                          </span>
                        </div>
                      </motion.div>

                      {/* Due Date Marker */}
                      <div
                        className="absolute top-0 w-1 h-full bg-red-500"
                        style={{ left: position.left }}
                      />
                    </div>
                  </div>

                  <div className="w-32 text-right">
                    <div className="text-sm font-medium text-notion-text">
                      {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-notion-text-light">
                      {project.timeline}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="ml-52 flex items-center space-x-6 text-sm text-notion-text-light">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{project.team.length} members</span>
                  </div>

                  {!clientView && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${project.budget.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1">
                    <CheckSquare className="w-4 h-4" />
                    <span>
                      {project.tasks.filter((t) => t.completed).length}/
                      {project.tasks.length} tasks
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-notion-border">
          <h4 className="text-sm font-medium text-notion-text mb-3">Legend</h4>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-50 border-2 border-red-300 rounded"></div>
              <span className="text-sm text-notion-text-light">
                High Priority
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-50 border-2 border-yellow-300 rounded"></div>
              <span className="text-sm text-notion-text-light">
                Medium Priority
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-50 border-2 border-green-300 rounded"></div>
              <span className="text-sm text-notion-text-light">
                Low Priority
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500"></div>
              <span className="text-sm text-notion-text-light">Due Date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
