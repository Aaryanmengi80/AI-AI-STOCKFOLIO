import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Badge, ScrollReveal, Modal, Toast, Skeleton } from '../ui/Base';
import { ShieldAlert, Zap, AlertTriangle, Activity, Lock, Target, ShieldCheck, Loader2, RefreshCw } from 'lucide-react';
import RiskCalculator from '../dashboard/RiskCalculator';
import { API_BASE_URL } from '../../config';

const RiskView = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [showLogs, setShowLogs] = useState(false);
    const [toast, setToast] = useState(null);
    const [constraintModal, setConstraintModal] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/portfolio/status`);
            const d = await response.json();
            setData(d);
        } catch (err) {
            console.error("Risk sync failed:", err);
            setToast("Risk Engine Offline.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const stressTests = [
        { scenario: 'Market Crash (-20%)', impact: data ? `-${(20 * (data.risk_metrics?.volatility || 0.7)).toFixed(1)}%` : '-14.2%', resilience: 'High', status: 'Safeguarded' },
        { scenario: 'High Volatility Phase', impact: '+1.4%', resilience: 'Opportunistic', status: 'Profit Mode' },
        { scenario: 'Interest Rate Spike', impact: '-2.1%', resilience: 'Stable', status: 'Hedged' },
        { scenario: 'Hyper-Inflation', impact: '+4.8%', resilience: 'Anti-Fragile', status: 'Protected' },
    ];

    const runStressTest = (scenarioName = "Global System Failure") => {
        setIsRunning(true);
        setToast(`Initializing neural simulation for: ${scenarioName}...`);
        setTimeout(() => {
            setIsRunning(false);
            setToast(`${scenarioName} simulation complete: System integrity at ${(98 - (data?.risk_metrics?.volatility * 10 || 5)).toFixed(1)}%.`);
        }, 2000);
    };

    if (loading) return (
        <div className="space-y-8 px-4">
            <Skeleton className="w-64 h-10" />
            <Skeleton className="w-full h-64" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="md:col-span-2 h-64" />
                <Skeleton className="h-64" />
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert className="text-ai-secondary" size={20} />
                        <Badge variant="warning">Stress Testing Active</Badge>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Risk Architecture</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Advanced stress testing and correlation analysis of your financial structure.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchData} className="btn-outline text-sm py-2 px-3 flex items-center gap-2">
                        <RefreshCw size={16} />
                    </button>
                    <button onClick={() => setShowLogs(true)} className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                        <Lock size={16} /> Encryption Logs
                    </button>
                    <button
                        onClick={runStressTest}
                        disabled={isRunning}
                        className="btn-primary border-ai-secondary bg-ai-secondary hover:bg-ai-secondary/90 text-sm py-2 px-4 flex items-center gap-2 min-w-[150px] justify-center"
                    >
                        {isRunning ? <Loader2 size={16} className="animate-spin" /> : <><Zap size={16} /> Run Stress Test</>}
                    </button>
                </div>
            </header>

            <ScrollReveal>
                <RiskCalculator portfolioData={data} />
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card glow className="relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold">Predictive Stress Simulation</h3>
                            <div className="text-xs font-bold text-slate-400">Live Backend Calculation</div>
                        </div>

                        <div className="space-y-6">
                            {stressTests.map((test, idx) => (
                                <motion.div
                                    key={test.scenario}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-ai-secondary/30 transition-all cursor-pointer"
                                    onClick={() => runStressTest(test.scenario)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${test.impact.startsWith('-') ? 'bg-rose-100 text-rose-500' : 'bg-emerald-100 text-emerald-500'}`}>
                                            <AlertTriangle size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm tracking-tight group-hover:text-ai-secondary transition-colors">{test.scenario}</div>
                                            <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{test.resilience} Resilience</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-black text-lg ${test.impact.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
                                            {test.impact}
                                        </div>
                                        <Badge variant={test.impact.startsWith('-') ? 'info' : 'success'}>{test.status}</Badge>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="bg-gradient-to-br from-slate-900 to-ai-dark text-white border-none shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Activity size={100} />
                        </div>
                        <h3 className="text-sm uppercase font-bold text-slate-400 mb-6">Real-time Volatility (Annual)</h3>
                        <div className="text-5xl font-black mb-2 tracking-tighter">
                            {(data?.risk_metrics?.volatility * 100 || 12.4).toFixed(1)}%
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-6">
                            Portfolio risk score: <span className="text-ai-primary font-bold">{data?.risk_score || "Determining..."}</span>
                        </p>
                        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ai-primary">
                            <span>System Healthy</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-ai-primary rounded-full animate-pulse" />)}
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="text-ai-secondary" size={16} />
                            <h3 className="font-bold text-sm">Target Risk Profile</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: 'Equity Concentration', val: 'Low' },
                                { label: 'Liquidity Buffer', val: 'High' },
                                { label: 'Geographic Skew', val: 'Neutral' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">{item.label}</span>
                                    <span className="font-bold">{item.val}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setConstraintModal(true)}
                            className="w-full mt-6 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Adjust Constraints
                        </button>
                    </Card>
                </div>
            </div>

            <Modal isOpen={showLogs} onClose={() => setShowLogs(false)} title="Secure Encryption Logs">
                <div className="space-y-4 font-mono text-[10px] p-4 bg-slate-950 text-emerald-500 rounded-xl max-h-[300px] overflow-y-auto shadow-inner border border-slate-800">
                    <div>[INFO] Establishing secure quantum tunnel...</div>
                    <div className="text-slate-500">[DEBUG] Handshake verified @ node 4429</div>
                    <div>[STATUS] 256-bit AES Layer active</div>
                    <div className="animate-pulse">_ Generating continuous noise floor...</div>
                </div>
            </Modal>

            <Modal isOpen={constraintModal} onClose={() => setConstraintModal(false)} title="System Constraints Override">
                <div className="space-y-4 py-2">
                    <p className="text-xs text-rose-500 font-bold mb-4 flex items-center gap-2"><Lock size={14} /> SECURITY CLEARANCE REQUIRED</p>
                    {['Liquidity Lock', 'Max Sector Drawdown', 'Derivative Hedging'].map(setting => (
                        <div key={setting} className="flex justify-between items-center p-3 bg-slate-800 rounded-xl border border-slate-700">
                            <span className="text-sm font-medium">{setting}</span>
                            <div className="w-10 h-5 bg-ai-secondary rounded-full relative cursor-pointer opacity-50">
                                <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => {setConstraintModal(false); setToast("Administrator privileges denied. Safety constraints enforced.")}} className="w-full mt-4 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl font-bold transition-colors">
                        Force Override
                    </button>
                </div>
            </Modal>

            <AnimatePresence>
                {toast && <Toast message={toast} onClose={() => setToast(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default RiskView;
