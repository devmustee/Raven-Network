"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

export function NotificationToaster() {
  const { toasts, removeToast } = useNotifications();

  return (
    <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            layout
            className="pointer-events-auto flex items-start gap-3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div 
              className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 -z-10 ${
                toast.type === "success" ? "bg-green-500" :
                toast.type === "achievement" ? "bg-yellow-500" :
                toast.type === "warning" ? "bg-red-500" :
                "bg-accent-cyan"
              }`} 
            />

            {/* Icon */}
            <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              toast.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
              toast.type === "achievement" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
              toast.type === "warning" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
              "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30"
            }`}>
              {toast.type === "success" && <CheckCircle2 className="w-4 h-4" />}
              {toast.type === "achievement" && <Sparkles className="w-4 h-4" />}
              {toast.type === "warning" && <AlertCircle className="w-4 h-4" />}
              {toast.type === "default" && <Info className="w-4 h-4" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-6">
              {toast.title && (
                <h4 className="text-xs font-bold text-white mb-0.5">{toast.title}</h4>
              )}
              <p className="text-xs text-white/70 leading-relaxed">{toast.message}</p>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => removeToast(toast.id)}
              className="absolute top-3 right-3 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
