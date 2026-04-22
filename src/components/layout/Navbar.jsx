import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, User, LayoutDashboard, Briefcase, ShieldAlert, BarChart2, ShieldCheck, Mail, Globe, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, Badge } from '../ui/Base';

const Navbar = ({ activeTab, setActiveTab }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [showProfile, setShowProfile] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Portfolio', icon: <Briefcase size={18} /> },
        { name: 'Risk', icon: <ShieldAlert size={18} /> },
        { name: 'Insights', icon: <BarChart2 size={18} /> },
    ];

    return (
        <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 px-6 py-3 flex items-center justify-between border-none rounded-2xl bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setActiveTab('Dashboard')}
                    className="flex items-center gap-3 hover:opacity-80 transition-all group"
                >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-ai-primary/20 group-hover:scale-110 transition-transform">
                        <img src="/src/assets/logo.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        AI STOCKFOLIO
                    </span>
                </button>
            </div>

            <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`flex items-center gap-2 text-sm font-medium transition-all group relative py-2 ${activeTab === item.name
                            ? 'text-ai-primary'
                            : 'text-slate-500 hover:text-ai-primary dark:text-slate-400 dark:hover:text-ai-primary'
                            }`}
                    >
                        {item.icon}
                        {item.name}
                        {activeTab === item.name && (
                            <motion.div
                                layoutId="activeNav"
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ai-primary rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="relative flex items-center gap-4">
                <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 pl-4 border-l border-slate-800 hover:opacity-80 transition-opacity focus:outline-none"
                >
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-ai-primary">
                        <User size={18} />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">Dr. Investor</span>
                </button>

                <AnimatePresence>
                    {showProfile && (
                        <>
                            {/* Invisible overlay to close dropdown when clicking outside */}
                            <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setShowProfile(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-14 right-0 w-72 glass-card bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl origin-top-right z-50"
                            >
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ai-primary to-ai-secondary flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-ai-primary/20">
                                        DR
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-200">Dr. Investor</h3>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <Badge variant="ai">Elite Tier</Badge>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-1 mb-4">
                                    {[
                                        { icon: <Settings size={14} />, label: 'AI Configuration' },
                                        { icon: <ShieldCheck size={14} />, label: 'Security' },
                                        { icon: <Globe size={14} />, label: 'Region & Network' },
                                    ].map(item => (
                                        <button key={item.label} className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-ai-primary hover:bg-slate-800/50 rounded-lg transition-colors w-full text-left">
                                            {item.icon}
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                
                                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl font-bold text-xs transition-colors">
                                    Disconnect Engine
                                </button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
