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
  Eye,
  EyeOff,
  MoreHorizontal,
  Play,
  Pause,
  CheckSquare,
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

interface ProjectCardProps {
  project: Project;
  clientView: boolean;
}

export default function ProjectCard({ project, clientView }: ProjectCardProps) {
  const [showDetails, setShowDetails] = useState(false);

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
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="notion-card hover:shadow-lg transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {getStatusIcon(project.status)}
            <h3 className="font-semibold text-notion-text">{project.name}</h3>
          </div>
          <p className="text-sm text-notion-text-light">{project.client}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
              project.priority
            )}`}
          >
            {project.priority}
          </span>
          <button className="p-1 hover:bg-notion-hover rounded">
            <MoreHorizontal className="w-4 h-4 text-notion-text-light" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-notion-text-light mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-notion-text">Progress</span>
          <span className="text-sm text-notion-text-light">
            {project.progress}%
          </span>
        </div>
        <ProgressBar progress={project.progress} />
      </div>

      {/* Client View Specific Content */}
      {clientView ? (
        <div className="space-y-3">
          {/* Simplified Status */}
          <div className="flex items-center justify-between p-3 bg-notion-gray rounded-lg">
            <span className="text-sm font-medium text-notion-text">Status</span>
            <StatusIndicator status={project.status} />
          </div>

          {/* Timeline */}
          <div className="flex items-center space-x-2 text-sm text-notion-text-light">
            <Calendar className="w-4 h-4" />
            <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
          </div>

          {/* Budget Overview */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-medium text-green-800">Budget</span>
            <span className="text-sm font-semibold text-green-800">
              ${project.spent.toLocaleString()} / $
              {project.budget.toLocaleString()}
            </span>
          </div>
        </div>
      ) : (
        /* Professional View */
        <div className="space-y-3">
          {/* Tasks */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-notion-text">Tasks</span>
            <span className="text-sm text-notion-text-light">
              {completedTasks}/{totalTasks} completed
            </span>
          </div>

          {/* Team */}
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-notion-text-light" />
            <span className="text-sm text-notion-text-light">
              {project.team.join(", ")}
            </span>
          </div>

          {/* Budget */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-notion-text-light" />
              <span className="text-sm text-notion-text-light">Budget</span>
            </div>
            <span className="text-sm font-semibold text-notion-text">
              ${project.spent.toLocaleString()} / $
              {project.budget.toLocaleString()}
            </span>
          </div>

          {/* Timeline */}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-notion-text-light" />
            <span className="text-sm text-notion-text-light">
              {project.timeline} • Due{" "}
              {new Date(project.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-notion-border">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-notion-blue hover:text-blue-600 font-medium"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {clientView ? (
          <button className="notion-button notion-button-primary text-sm">
            View Updates
          </button>
        ) : (
          <div className="flex space-x-2">
            <button className="notion-button notion-button-secondary text-sm">
              Edit
            </button>
            <button className="notion-button notion-button-primary text-sm">
              Update
            </button>
          </div>
        )}
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-notion-border"
        >
          <h4 className="font-medium text-notion-text mb-3">Task Breakdown</h4>
          <div className="space-y-2">
            {project.tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-2">
                {task.completed ? (
                  <CheckSquare className="w-4 h-4 text-notion-green" />
                ) : (
                  <Circle className="w-4 h-4 text-notion-text-light" />
                )}
                <span
                  className={`text-sm ${
                    task.completed
                      ? "line-through text-notion-text-light"
                      : "text-notion-text"
                  }`}
                >
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
