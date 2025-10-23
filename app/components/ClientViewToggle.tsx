"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface ClientViewToggleProps {
  clientView: boolean;
  onToggle: (clientView: boolean) => void;
}

export default function ClientViewToggle({
  clientView,
  onToggle,
}: ClientViewToggleProps) {
  return (
    <motion.button
      whileHover={{ opacity: 0.8 }}
      whileTap={{ opacity: 0.6 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={() => onToggle(!clientView)}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out h-8 flex items-center space-x-1 ${
        clientView
          ? "bg-green-600 text-white hover:bg-green-700"
          : "text-notion-text-light hover:bg-notion-hover"
      }`}
    >
      {clientView ? (
        <>
          <Eye className="w-4 h-4" />
          <span>Client View</span>
        </>
      ) : (
        <>
          <EyeOff className="w-4 h-4" />
          <span>Professional View</span>
        </>
      )}
    </motion.button>
  );
}
