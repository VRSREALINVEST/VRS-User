"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          // Marks the full-screen loading overlay so the webinar CTA
          // (globals.css) can hold its entrance until the loader clears.
          data-page-loader
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Glow */}
            <div className="absolute w-24 h-24 rounded-full bg-yellow-500/20 blur-2xl animate-pulse" />

            {/* Spinner */}
            <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />

            {/* Branding (optional premium touch) */}
            <span className="absolute mt-28 text-xs tracking-widest text-yellow-500/70">
              VRS Realinvest
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



