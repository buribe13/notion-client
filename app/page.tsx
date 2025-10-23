"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Home as HomeIcon,
  Inbox,
  Star,
  Settings,
  Trash2,
  Plus,
  Filter,
  SortAsc,
  MoreHorizontal,
  ChevronDown,
  Share,
  Eye,
  EyeOff,
} from "lucide-react";
import KanbanBoard from "./components/KanbanBoard";
import NotionSidebar from "./components/NotionSidebar";
import ClientViewToggle from "./components/ClientViewToggle";

// Mock data for projects matching the image
const projects = [
  {
    id: 1,
    name: "Quarterly sales planning",
    status: "not-started",
    priority: "medium",
    icon: "📊",
    description: "Plan Q1 sales strategy and targets",
  },
  {
    id: 2,
    name: "Public launch of iOS app",
    status: "in-progress",
    priority: "high",
    icon: "📱",
    description: "Launch our mobile app to the App Store",
  },
  {
    id: 3,
    name: "Revamp new hire onboarding",
    status: "done",
    priority: "low",
    icon: "👥",
    description: "Improve the onboarding experience for new employees",
  },
  {
    id: 4,
    name: "Website redesign",
    status: "not-started",
    priority: "high",
    icon: "🎨",
    description: "Complete redesign of corporate website",
  },
];

export default function NotionClient() {
  const [clientView, setClientView] = useState(false);
  const [selectedView, setSelectedView] = useState("by-status");

  const getStatusCount = (status: string) => {
    return projects.filter((p) => p.status === status).length;
  };

  return (
    <div className="notion-page">
      {/* Notion-style Sidebar */}
      <NotionSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="notion-header">
          <div className="flex items-center justify-between px-2 py-2">
            {/* Left side - Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm text-notion-text-light">
              <span className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>dashboard</span>
              </span>
              <span>/</span>
              <span className="flex items-center space-x-1">
                <span>breadcrumb...</span>
              </span>
              <span>/</span>
              <span className="flex items-center space-x-1 text-notion-text">
                <span>📊</span>
                <span>Projects</span>
              </span>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-notion-text-light">
                Edited 1h ago
              </span>
              <button className="notion-button notion-button-secondary flex items-center space-x-1 transition-all duration-200 ease-in-out hover:opacity-80">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="p-2 hover:bg-notion-hover rounded transition-all duration-200 ease-in-out hover:opacity-80">
                <Star className="w-4 h-4 text-notion-text-light" />
              </button>
              <button className="p-2 hover:bg-notion-hover rounded transition-all duration-200 ease-in-out hover:opacity-80">
                <MoreHorizontal className="w-4 h-4 text-notion-text-light" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="notion-content">
          {/* Page Header */}
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="text-4xl">📊</div>
              <h1
                className="font-bold text-notion-text"
                style={{ fontSize: "30pt" }}
              >
                Q Projects
              </h1>
            </div>
            <p
              className="text-notion-text font-normal"
              style={{ fontSize: "11pt" }}
            >
              Manage and execute projects from start to finish.
            </p>
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <button
                className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out h-8 flex items-center hover:opacity-80 ${
                  selectedView === "by-status"
                    ? "bg-notion-blue text-white"
                    : "text-notion-text-light hover:bg-notion-hover"
                }`}
                onClick={() => setSelectedView("by-status")}
              >
                → By Status
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out h-8 flex items-center hover:opacity-80 ${
                  selectedView === "all-projects"
                    ? "bg-notion-blue text-white"
                    : "text-notion-text-light hover:bg-notion-hover"
                }`}
                onClick={() => setSelectedView("all-projects")}
              >
                ★ All Projects
              </button>
              <button className="px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out text-notion-text-light hover:bg-notion-hover hover:opacity-80 h-8 flex items-center">
                Chart
              </button>
              <button className="px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out text-notion-text-light hover:bg-notion-hover hover:opacity-80 h-8 flex items-center">
                Gantt
              </button>
              <button className="px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out text-notion-text-light hover:bg-notion-hover hover:opacity-80 h-8 flex items-center">
                List
              </button>
              <button className="px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out text-notion-text-light hover:bg-notion-hover hover:opacity-80 h-8 flex items-center">
                Feed
              </button>
              <button className="px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out text-notion-text-light hover:bg-notion-hover hover:opacity-80 h-8 flex items-center">
                Board
              </button>
              <button className="px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out text-notion-text-light hover:bg-notion-hover hover:opacity-80 h-8 flex items-center">
                Gallery
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <ClientViewToggle
                clientView={clientView}
                onToggle={setClientView}
              />
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-notion-hover rounded transition-all duration-200 ease-in-out hover:opacity-80">
                  <SortAsc className="w-4 h-4 text-notion-text-light" />
                </button>
                <button className="p-2 hover:bg-notion-hover rounded transition-all duration-200 ease-in-out hover:opacity-80">
                  <Filter className="w-4 h-4 text-notion-text-light" />
                </button>
                <button className="p-2 hover:bg-notion-hover rounded transition-all duration-200 ease-in-out hover:opacity-80">
                  <Search className="w-4 h-4 text-notion-text-light" />
                </button>
                <button className="notion-button notion-button-primary flex items-center space-x-1 transition-all duration-200 ease-in-out hover:opacity-80">
                  <Plus className="w-4 h-4" />
                  <span>New</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Client View Notice */}
          {clientView && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-2 bg-blue-900 bg-opacity-30 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">
                  Client View Active
                </span>
              </div>
              <p className="text-blue-200 text-sm mt-2">
                This view shows simplified project information that clients can
                easily understand.
              </p>
            </motion.div>
          )}

          {/* Kanban Board */}
          <KanbanBoard projects={projects} clientView={clientView} />
        </main>
      </div>
    </div>
  );
}
