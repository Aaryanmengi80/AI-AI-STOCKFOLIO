import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { Card, Badge, ScrollReveal } from '../ui/Base';

const HomeView = ({ setActiveTab }) => {
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-10 pb-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ai-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 block" />
            <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none opacity-40 block" />

            <motion.div 
                className="relative z-10 max-w-5xl mx-auto w-full px-4 text-center pb-16"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={item} className="flex justify-center mb-6">
                    <Badge variant="ai" className="px-4 py-2 text-sm border-ai-primary/30 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                        <Cpu size={16} className="inline mr-2 animate-pulse" />
                        GEMINI 2.0 NEURAL CORE ACTIVE
                    </Badge>
                </motion.div>

                <motion.h1 variants={item} className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
                    <span className="text-slate-900 dark:text-white">Autonomous Wealth.</span><br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-ai-primary via-indigo-500 to-ai-secondary">
                        Fully Synthesized.
                    </span>
                </motion.h1>

                <motion.p variants={item} className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed">
                    The first industrial-grade AI quant platform. We ingest millions of real-time market nodes into a deep neural architecture to give you institutional-level asset intelligence.
                </motion.p>

                <motion.div variants={item} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button 
                        onClick={() => setActiveTab('Dashboard')}
                        className="group relative px-8 py-4 bg-ai-primary hover:bg-ai-primary/90 text-white font-bold rounded-2xl text-lg shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        Initialize Dashboard
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                        onClick={() => window.open('https://github.com/Aaryanmengi80/AI-AI-STOCKFOLIO', '_blank')}
                        className="px-8 py-4 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-2xl text-lg border border-slate-300 dark:border-slate-700 transition-all hover:scale-105"
                    >
                        View Architecture
                    </button>
                </motion.div>
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div 
                className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mt-8"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <ScrollReveal delay={0.2}>
                    <Card glow className="h-full border-t-2 border-t-ai-primary bg-white dark:bg-slate-900/60 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-ai-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-ai-primary/20 shadow-lg shadow-ai-primary/10">
                            <Activity size={28} className="text-ai-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Live Market Metrics</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Continuous data ingestion from Alpha Vantage and CoinGecko forming a living, breathing portfolio state.
                        </p>
                    </Card>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                    <Card glow className="h-full border-t-2 border-t-indigo-500 bg-white dark:bg-slate-900/60 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                            <BrainCircuit size={28} className="text-indigo-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Gemini LLM Copilot</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Non-deterministic AI synthesis. Generating instantaneous reports and deep dives on portfolio drift.
                        </p>
                    </Card>
                </ScrollReveal>

                <ScrollReveal delay={0.6}>
                    <Card glow className="h-full border-t-2 border-t-emerald-500 bg-white dark:bg-slate-900/60 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                            <ShieldAlert size={28} className="text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Predictive Risk Labs</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Simulate macro-economic crashes and hyper-inflation vectors against your exact allocation weights.
                        </p>
                    </Card>
                </ScrollReveal>
            </motion.div>
        </div>
    );
};

export default HomeView;
