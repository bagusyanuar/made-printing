"use client";

import * as React from "react";
import { LogOut, User, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/features/auth/actions";

interface UserAccountProps {
  username: string;
  avatarUrl?: string;
}

export function UserAccount({ username, avatarUrl }: UserAccountProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
      >
        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
          {username.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden md:block">{username}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 p-1.5"
            >
              <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                <p className="text-xs text-zinc-500">Logged in as</p>
                <p className="text-sm font-semibold truncate">{username}</p>
              </div>

              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                <User className="size-4" /> Profile
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                <Settings className="size-4" /> Settings
              </button>

              <button 
                onClick={() => signOut()}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
              >
                <LogOut className="size-4" /> Sign Out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
