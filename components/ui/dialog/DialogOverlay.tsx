"use client";

import { motion } from "framer-motion";

export function DialogOverlay({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm"
    />
  );
}
