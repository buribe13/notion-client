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
  Filter,
  Search,
  SortAsc,
  SortDesc,
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

interface ProjectTableProps {
  projects: Project[];
  clientView: boolean;
}

export default function ProjectTable({
  projects,
  clientView,
}: ProjectTableProps) {
  const [sortField, setSortField] = useState<keyof Project>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof Project) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <SortAsc className="w-4 h-4" />
    ) : (
      <SortDesc className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white rounded-lg border border-notion-border overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-notion-border bg-notion-gray">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-notion-text">
            Projects Table
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-notion-text-light" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-notion-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-notion-blue"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-notion-gray border-b border-notion-border">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-notion-text-light uppercase tracking-wider cursor-pointer hover:bg-notion-hover"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-2">
                  <span>Project</span>
                  {getSortIcon("name")}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-notion-text-light uppercase tracking-wider cursor-pointer hover:bg-notion-hover"
                onClick={() => handleSort("client")}
              >
                <div className="flex items-center space-x-2">
                  <span>Client</span>
                  {getSortIcon("client")}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-notion-text-light uppercase tracking-wider cursor-pointer hover:bg-notion-hover"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center space-x-2">
                  <span>Status</span>
                  {getSortIcon("status")}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-notion-text-light uppercase tracking-wider cursor-pointer hover:bg-notion-hover"
                onClick={() => handleSort("progress")}
              >
                <div className="flex items-center space-x-2">
                  <span>Progress</span>
                  {getSortIcon("progress")}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-notion-text-light uppercase tracking-wider cursor-pointer hover:bg-notion-hover"
                onClick={() => handleSort("dueDate")}
              >
                <div className="flex items-center space-x-2">
                  <span>Due Date</span>
                  {getSortIcon("dueDate")}
                </div>
              </th>
              {!clientView && (
                <>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-notion-text-light uppercase tracking-wider cursor-pointer hover:bg-notion-hover"
                    onClick={() => handleSort("team")}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Team</span>
                      {getSortIcon("team")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-notion-text-light uppercase tracking-wider cursor-pointer hover:bg-notion-hover"
                    onClick={() => handleSort("budget")}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Budget</span>
                      {getSortIcon("budget")}
                    </div>
                  </th>
                </>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-notion-text-light uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-notion-border">
            {sortedProjects.map((project) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-notion-hover transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-lg bg-notion-blue flex items-center justify-center text-white font-semibold">
                        {project.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-notion-text">
                        {project.name}
                      </div>
                      <div className="text-sm text-notion-text-light">
                        {project.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-notion-text">
                    {project.client}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusIndicator status={project.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-32">
                    <ProgressBar progress={project.progress} size="sm" />
                    <div className="text-xs text-notion-text-light mt-1">
                      {project.progress}%
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-notion-text-light" />
                    <span className="text-sm text-notion-text">
                      {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                {!clientView && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-notion-text-light" />
                        <span className="text-sm text-notion-text">
                          {project.team.length} members
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-notion-text">
                        ${project.spent.toLocaleString()} / $
                        {project.budget.toLocaleString()}
                      </div>
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-notion-blue hover:text-blue-600">
                      View
                    </button>
                    {!clientView && (
                      <button className="text-notion-text-light hover:text-notion-text">
                        Edit
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-notion-border bg-notion-gray">
        <div className="flex items-center justify-between">
          <div className="text-sm text-notion-text-light">
            Showing {sortedProjects.length} of {projects.length} projects
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-notion-border rounded hover:bg-notion-hover">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-notion-border rounded hover:bg-notion-hover">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
