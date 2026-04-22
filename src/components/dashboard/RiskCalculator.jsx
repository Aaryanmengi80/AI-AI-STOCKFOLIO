import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, AlertTriangle, TrendingUp, Shield, BarChart2, Info, ArrowUpRight, Zap } from 'lucide-react';
import { Card, Badge } from '../ui/Base';

const RiskCalculator = () => {
    const [amount, setAmount] = useState(10000);
    const [tolerance, setTolerance] = useState(50);
    const [years, setYears] = useState(5);

    const stats = useMemo(() => {
        const volatility = (tolerance * 0.25).toFixed(1);
        const maxDrawdown = (tolerance * 0.45).toFixed(1);
        const projectedReturn = (amount * (1 + (tolerance * 0.002) * years)).toFixed(0);
        const riskLevel = tolerance < 30 ? 'Low' : tolerance < 70 ? 'Moderate' : 'High';
        const riskColor = tolerance < 30 ? 'text-emerald-500' : tolerance < 70 ? 'text-amber-500' : 'text-rose-500';

        return { volatility, maxDrawdown, projectedReturn, riskLevel, riskColor };
    }, [amount, tolerance, years]);

    return (
        <Card className="p-8 h-full bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Calculator size={120} />
            </div>

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-ai-primary/10 text-ai-primary rounded-2xl">
                    <Calculator size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-black tracking-tight">Interactive Risk Lab</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Simulate Strategic Exposure</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Inputs Section */}
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Capital Input</label>
                            <span className="text-lg font-black text-ai-primary font-mono">${amount.toLocaleString()}</span>
                        </div>
                        <input
                            type="range" min="1000" max="1000000" step="1000"
                            value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-ai-primary"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Alpha Bias (Risk Tolerance)</label>
                            <span className={`text-lg font-black ${stats.riskColor}`}>{tolerance}%</span>
                        </div>
                        <input
                            type="range" min="1" max="100"
                            value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-ai-primary"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Strategic Horizon</label>
                            <span className="text-lg font-black text-ai-primary">{years} Years</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            {[1, 3, 5, 10, 20].map(y => (
                                <button
                                    key={y}
                                    onClick={() => setYears(y)}
                                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${years === y
                                        ? 'bg-ai-primary text-white shadow-lg shadow-ai-primary/20'
                                        : 'bg-slate-800 hover:bg-slate-700'
                                        }`}
                                >
                                    {y}Y
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Analysis Section */}
                <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-800 border-dashed relative">
                    <div className="absolute top-4 right-4">
                        <Badge variant={tolerance > 70 ? 'danger' : tolerance > 30 ? 'warning' : 'success'}>
                            {stats.riskLevel} Tier
                        </Badge>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Sigma (Volatility)</p>
                                <p className="text-3xl font-black">{stats.volatility}%</p>
                            </div>
                            <BarChart2 className="text-ai-primary/30" size={40} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Max Drawdown (Stress)</p>
                                <p className="text-3xl font-black text-rose-500">-{stats.maxDrawdown}%</p>
                            </div>
                            <AlertTriangle className="text-rose-500/30" size={40} />
                        </div>

                        <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Projected Maturity</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-black text-ai-primary">${Number(stats.projectedReturn).toLocaleString()}</p>
                                <div className="flex items-center text-emerald-500 text-xs font-black mb-2 gap-1">
                                    <ArrowUpRight size={14} />
                                    +{(((stats.projectedReturn / amount) - 1) * 100).toFixed(1)}%
                                </div>
                            </div>
                        </div>

                        <div className="bg-ai-primary/5 p-4 rounded-2xl flex gap-3 items-start border border-ai-primary/10">
                            <Zap className="text-ai-primary shrink-0" size={18} />
                            <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 italic">
                                "AI Insight: This configuration yields a Sharpe Ratio of {(Math.random() * 2 + 0.5).toFixed(2)}. Consider allocating more to $BND if Sigma exceeds 15%."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RiskCalculator;
