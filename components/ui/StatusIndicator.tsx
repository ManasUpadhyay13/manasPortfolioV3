"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Zap } from "lucide-react";

type StatusData = {
  isWorking: boolean;
  todayTotal: string;
  yesterdayTotal: string;
};

export function StatusIndicator() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/status");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.error("Failed to fetch status", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading || !data) return null;

  return (
    <div className="absolute bottom-0 right-0 z-20">
      <div className="relative group">
        {/* The Badge */}
        <div 
          className={`flex items-center justify-center h-8 w-8 rounded-full border-2 border-white shadow-sm transition-colors ${
            data.isWorking ? "bg-black text-white" : "bg-gray-100 text-gray-400"
          }`}
        >
          {data.isWorking ? (
            <Code2 className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
          ) : (
            <Code2 className="w-4 h-4" />
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:block w-max">
           <motion.div
             initial={{ opacity: 0, x: -5 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-black/90 text-white text-xs rounded-lg py-2 px-3 shadow-xl backdrop-blur-sm border border-white/10"
           >
              <div className="flex flex-col gap-1 items-start">
                 <span className="font-medium">
                   {data.isWorking ? "Currently Coding ⚡️" : "Currently not coding 💤"}
                 </span>
                 <span className="text-gray-300 text-[10px] border-t border-white/10 pt-1 mt-0.5">
                   {data.isWorking ? `Today: ${data.todayTotal}` : `Yesterday: ${data.yesterdayTotal}`}
                 </span>
              </div>
              {/* Arrow */}
              <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-black/90"></div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
