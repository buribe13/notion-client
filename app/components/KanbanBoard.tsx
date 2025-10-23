"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Circle } from "lucide-react";

interface Project {
  id: number;
  name: string;
  status: string;
  priority: string;
  icon: string;
  description: string;
}

interface KanbanBoardProps {
  projects: Project[];
  clientView: boolean;
}

export default function KanbanBoard({
  projects,
  clientView,
}: KanbanBoardProps) {
  const [draggedProject, setDraggedProject] = useState<Project | null>(null);

  const getStatusCount = (status: string) => {
    return projects.filter((p) => p.status === status).length;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "not-started":
        return <Circle className="w-4 h-4 text-status-not-started" />;
      case "in-progress":
        return <Circle className="w-4 h-4 text-status-in-progress" />;
      case "done":
        return <Circle className="w-4 h-4 text-status-done" />;
      default:
        return <Circle className="w-4 h-4 text-notion-text-light" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not-started":
        return "text-status-not-started";
      case "in-progress":
        return "text-status-in-progress";
      case "done":
        return "text-status-done";
      default:
        return "text-notion-text-light";
    }
  };

  const columns = [
    {
      id: "not-started",
      title: "Not started",
      count: getStatusCount("not-started"),
      projects: projects.filter((p) => p.status === "not-started"),
    },
    {
      id: "in-progress",
      title: "In progress",
      count: getStatusCount("in-progress"),
      projects: projects.filter((p) => p.status === "in-progress"),
    },
    {
      id: "done",
      title: "Done",
      count: getStatusCount("done"),
      projects: projects.filter((p) => p.status === "done"),
    },
  ];

  return (
    <div className="flex space-x-6">
      {columns.map((column) => (
        <div key={column.id} className="kanban-column w-80">
          {/* Column Header */}
          <div className="p-4">
            <div className="flex items-center space-x-2">
              {getStatusIcon(column.id)}
              <h3 className="font-medium text-notion-text">{column.title}</h3>
              <span className="text-sm text-notion-text-light">
                {column.count}
              </span>
            </div>
          </div>

          {/* Column Content */}
          <div className="p-4 space-y-3">
            {column.projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="kanban-card"
                draggable
                onDragStart={() => setDraggedProject(project)}
                onDragEnd={() => setDraggedProject(null)}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{project.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-notion-text mb-1">
                      {project.name}
                    </h4>
                    {!clientView && (
                      <p className="text-sm text-notion-text-light mb-2">
                        {project.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-2">
                      <span
                        className={`priority-tag ${getPriorityColor(
                          project.priority
                        )}`}
                      >
                        {project.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add New Project Button */}
            <motion.button
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full p-3 border-2 border-dashed rounded-lg text-notion-text-light hover:text-notion-blue transition-all duration-200 ease-in-out flex items-center justify-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>+ New project</span>
            </motion.button>
          </div>
        </div>
      ))}
    </div>
  );
}
