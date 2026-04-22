import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Cpu } from 'lucide-react';

const thoughts = [
    "Analyzing cross-sector correlations for Q3 alpha...",
    "Live Sentiment: Tech bullish (+1.8σ), Regional Banks neutral.",
    "Optimization Engine: Rebalancing crypto-delta hedge...",
    "Macro Signal: Yield curve inversion mitigating in Euro-zone.",
    "Detected high-beta breakout in energy sector nodes.",
    "System Health: 99.8% - No critical risk fragments detected.",
    "Synthesizing 40k earnings calls for sentiment drift...",
];

const ThoughtStream = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % thoughts.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[40] bg-slate-900/10 dark:bg-white/5 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-6 overflow-hidden">
            <div className="container mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 shrink-0">
                    <Activity size={14} className="text-ai-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">Live AI Stream</span>
                </div>

                <div className="flex-grow flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-[11px] font-bold text-slate-600 dark:text-white/80 italic flex items-center gap-2"
                        >
                            <Sparkles size={12} className="text-ai-secondary" />
                            {thoughts[index]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-black uppercase text-emerald-500">Processing Live</span>
                    <Cpu size={14} className="text-emerald-500" />
                </div>
            </div>
        </div>
    );
};

export default ThoughtStream;
