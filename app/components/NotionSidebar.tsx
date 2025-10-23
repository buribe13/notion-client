"use client";

import { useState } from "react";
import {
  Search,
  Home as HomeIcon,
  Bot,
  Inbox,
  Star,
  Settings,
  Trash2,
  ChevronDown,
  Plus,
} from "lucide-react";

export default function NotionSidebar() {
  const [expandedSections, setExpandedSections] = useState({
    favorites: true,
    workspace: true,
    shared: true,
    private: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className="notion-sidebar">
      <div className="p-2">
        {/* Workspace Header */}
        <div className="mb-2">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center space-x-1">
              <div className="relative">
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">B</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">1</span>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-400">
                benjamin's Notion
              </span>
            </div>
            <div className="flex items-center space-x-0.5">
              <button className="p-0.5 hover:bg-notion-hover rounded">
                <svg
                  className="w-4 h-4 text-notion-text-light"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button className="p-0.5 hover:bg-notion-hover rounded">
                <ChevronDown className="w-4 h-4 text-notion-text-light" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-0.5 mb-2">
          <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
            <Search className="w-4 h-4 text-notion-text-light" />
            <span className="text-sm text-gray-400">Search</span>
          </div>
          <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
            <HomeIcon className="w-4 h-4 text-notion-text-light" />
            <span className="text-sm text-gray-400">Home</span>
          </div>
          <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
            <Bot className="w-4 h-4 text-notion-text-light" />
            <span className="text-sm text-gray-400">Notion AI</span>
            <span className="px-1 py-0.5 text-xs bg-notion-blue text-white rounded-full">
              New
            </span>
          </div>
          <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
            <Inbox className="w-4 h-4 text-notion-text-light" />
            <span className="text-sm text-gray-400">Inbox</span>
          </div>
        </div>

        {/* Favorites */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("favorites")}
            className="px-2 py-1 w-full text-left hover:bg-notion-hover rounded-md"
          >
            <span
              className="font-medium text-gray-400"
              style={{ fontSize: "11px" }}
            >
              Favorites
            </span>
          </button>
          {expandedSections.favorites && (
            <div className="ml-2 space-y-0.5 mt-1">
              <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
                <span className="text-lg">⭐</span>
                <span className="text-sm text-gray-400">
                  dashboard / breadcrumb...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Workspace */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("workspace")}
            className="px-2 py-1 w-full text-left hover:bg-notion-hover rounded-md"
          >
            <span
              className="font-medium text-gray-400"
              style={{ fontSize: "11px" }}
            >
              Workspace
            </span>
          </button>
          {expandedSections.workspace && (
            <div className="ml-2 space-y-0.5 mt-1">
              <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
                <span className="text-lg">📊</span>
                <span className="text-sm text-gray-400">
                  dashboard / breadcrumb...
                </span>
              </div>
              <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
                <span className="text-lg">🍎</span>
                <span className="text-sm text-gray-400">My Dashboard</span>
              </div>
              <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
                <span className="text-lg">⚾</span>
                <span className="text-sm text-gray-400">
                  UX project planner/tracker
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Shared */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("shared")}
            className="px-2 py-1 w-full text-left hover:bg-notion-hover rounded-md"
          >
            <span
              className="font-medium text-gray-400"
              style={{ fontSize: "11px" }}
            >
              Shared
            </span>
          </button>
          {expandedSections.shared && (
            <div className="ml-2 space-y-0.5 mt-1">
              <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
                <span className="text-lg">🍎</span>
                <span className="text-sm text-gray-400">My Dashboard</span>
              </div>
            </div>
          )}
        </div>

        {/* Private */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection("private")}
            className="px-2 py-1 w-full text-left hover:bg-notion-hover rounded-md"
          >
            <span
              className="font-medium text-gray-400"
              style={{ fontSize: "11px" }}
            >
              Private
            </span>
          </button>
          {expandedSections.private && (
            <div className="ml-2 space-y-0.5 mt-1">
              <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
                <span className="text-lg">⚙️</span>
                <span className="text-sm text-gray-400">Settings</span>
              </div>
              <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
                <span className="text-lg">🏪</span>
                <span className="text-sm text-gray-400">Marketplace</span>
              </div>
              <div className="flex items-center space-x-3 px-2 py-1 hover:bg-notion-hover rounded-md cursor-pointer">
                <span className="text-lg">🗑️</span>
                <span className="text-sm text-gray-400">Trash</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 bg-notion-text-light rounded flex items-center justify-center">
            <span className="text-xs font-bold text-notion-bg">N</span>
          </div>
          <div className="w-6 h-6 bg-notion-text-light rounded flex items-center justify-center">
            <span className="text-xs">in</span>
          </div>
          <div className="w-6 h-6 bg-notion-text-light rounded flex items-center justify-center">
            <span className="text-xs">✈</span>
          </div>
          <div className="w-6 h-6 bg-notion-text-light rounded flex items-center justify-center">
            <span className="text-xs">?</span>
          </div>
          <div className="w-6 h-6 bg-notion-text-light rounded flex items-center justify-center">
            <span className="text-xs">?</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
