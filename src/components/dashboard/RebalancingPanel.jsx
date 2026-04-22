import React, { useState, useEffect } from 'react';
import { Card, Badge, Modal, Toast } from '../ui/Base';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle, Sparkles, ChevronRight, Loader2, Zap, ShieldCheck } from 'lucide-react';

const RebalanceCard = ({ asset, action, current, target, reason }) => (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group overflow-hidden">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h4 className="font-black text-lg tracking-tight mb-1">{asset}</h4>
                <div className={`text-[10px] font-black uppercase tracking-widest ${action === 'Increase' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    AI Action: {action}
                </div>
            </div>
            <div className={`p-3 rounded-2xl ${action === 'Increase' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {action === 'Increase' ? <ArrowUpCircle size={24} /> : <ArrowDownCircle size={24} />}
            </div>
        </div>

        <div className="flex items-center gap-6 mb-8">
            <div className="flex-1">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest mb-1">Current</div>
                <div className="text-xl font-bold">{current}%</div>
            </div>
            <div className="w-px h-10 bg-slate-100 dark:bg-slate-800" />
            <div className="flex-1">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest mb-1">Target</div>
                <div className="text-xl font-bold text-ai-primary">{target}%</div>
            </div>
            <div className="shrink-0 text-right">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest mb-1">Shift</div>
                <div className={`text-xl font-black ${action === 'Increase' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {action === 'Increase' ? '+' : '-'}{Math.abs(target - current)}%
                </div>
            </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "{reason}"
            </p>
        </div>
    </div>
);

const RebalancingPanel = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/portfolio/rebalance')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setSuggestions(data);
                } else {
                    console.warn("Expected array for rebalancing, got:", data);
                    setSuggestions([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch rebalancing suggestions:", err);
                setSuggestions([]);
                setLoading(false);
            });
    }, []);

    const handleApply = () => {
        setIsApplying(true);
        setTimeout(() => {
            setIsApplying(false);
            setShowSuccess(true);
        }, 1500);
    };

    const confirmApply = () => {
        setShowSuccess(false);
        setToast("Portfolio weights updated across all exchange nodes.");
    };

    return (
        <Card className="overflow-hidden relative h-full min-h-[520px] flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles size={120} />
            </div>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold">AI Rebalancing Suggestions</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Optimization based on current market volatility.</p>
                </div>
                <button
                    onClick={handleApply}
                    disabled={isApplying}
                    className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50"
                >
                    {isApplying ? <Loader2 className="animate-spin" size={16} /> : 'Apply All'} <ChevronRight size={16} />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 gap-4">
                    {loading ? (
                        <div className="flex items-center justify-center p-12">
                            <Loader2 className="animate-spin text-ai-primary" size={32} />
                        </div>
                    ) : (
                        suggestions.map((item, idx) => (
                            <motion.div
                                key={item.asset}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 + 0.3 }}
                            >
                                <RebalanceCard {...item} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Confirm Rebalancing"
            >
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-emerald-900/20 border border-emerald-500/20 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                            <ShieldCheck size={32} />
                        </div>
                        <h4 className="text-lg font-bold text-emerald-400 mb-2">Strategy Optimized</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Executing these moves will re-align your portfolio with its target risk architecture.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Projected Alpha Gen</span>
                            <span className="font-bold text-emerald-500">+2.4% annually</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Network Fee Est.</span>
                            <span className="font-bold">$12.40</span>
                        </div>
                    </div>

                    <button
                        onClick={confirmApply}
                        className="w-full py-4 bg-ai-primary text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-ai-primary/20 transition-all flex items-center justify-center gap-3"
                    >
                        <Zap size={20} /> Execute Order Flow
                    </button>
                </div>
            </Modal>

            <AnimatePresence>
                {toast && (
                    <Toast message={toast} onClose={() => setToast(null)} />
                )}
            </AnimatePresence>
        </Card>
    );
};

export default RebalancingPanel;
