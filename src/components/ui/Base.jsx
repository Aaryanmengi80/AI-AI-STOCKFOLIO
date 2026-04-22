import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Card = ({ children, className = '', glow = false, interactive = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={interactive ? { y: -5, scale: 1.01 } : {}}
            className={`glass-card p-6 ${glow ? 'ai-glow border-ai-primary/30' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export const FlashCard = ({ title, content, icon: Icon, color = 'blue', badge }) => {
    const colors = {
        blue: 'bg-blue-500/10 text-blue-500 border-blue-200/50 dark:border-blue-500/30',
        violet: 'bg-violet-500/10 text-violet-500 border-violet-200/50 dark:border-violet-500/30',
        emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-200/50 dark:border-emerald-500/30',
        amber: 'bg-amber-500/10 text-amber-500 border-amber-200/50 dark:border-amber-500/30',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`glass-card p-5 relative overflow-hidden group border-2 ${colors[color]} min-h-[160px] flex flex-col justify-between`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={64} />
            </div>

            <div>
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 shadow-sm">
                        <Icon size={20} />
                    </div>
                    {badge && <Badge variant="ai">{badge}</Badge>}
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-ai-primary transition-colors">{title}</h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {content}
            </p>

            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-ai-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View Analysis <span className="text-sm">→</span>
            </div>
        </motion.div>
    );
};

export const Badge = ({ children, variant = 'info' }) => {
    const variants = {
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
        warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
        danger: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
        ai: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]}`}>
            {children}
        </span>
    );
};

export const ScrollReveal = ({ children, delay = 0, direction = 'up' }) => {
    const directions = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
        >
            {children}
        </motion.div>
    );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white dark:bg-slate-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glass-card w-full max-w-lg p-8 relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ai-primary to-ai-secondary" />
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
                    >
                        <div className="w-6 h-6 flex items-center justify-center text-slate-500 font-bold">✕</div>
                    </button>
                </div>
                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[200] max-w-sm px-6 py-4 rounded-2xl shadow-2xl bg-white dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-white flex items-center gap-4 font-bold border border-slate-200 dark:border-white/10"
        >
            <div className={`w-3 h-3 rounded-full animate-pulse ${type === 'success' ? 'bg-emerald-500' : 'bg-ai-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} />
            <span className="text-sm tracking-tight">{message}</span>
        </motion.div>
    );
};

export const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-xl ${className}`} />
);
