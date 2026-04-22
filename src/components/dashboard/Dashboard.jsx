import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Badge, ScrollReveal, Modal, Toast, Skeleton } from '../ui/Base';
import { TrendingUp, Shield, Activity, Target, ArrowUpRight, ArrowDownRight, Sparkles, Loader2, FileCheck, Download, Zap, ZapOff, Settings, RefreshCw, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import AllocationChart from './AllocationChart';
import RebalancingPanel from './RebalancingPanel';
import RiskAnalysis from './RiskAnalysis';
import AIPanel from './AIPanel';
import InsightsGrid from './InsightsGrid';
import SectorPerformance from './SectorPerformance';

const StatCard = ({ title, value, change, icon: Icon, color, confidence }) => (
    <Card glow className="relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${color}/20 text-ai-primary`}>
                <Icon size={24} />
            </div>
            {change && (
                <div className={`flex items-center text-sm font-bold ${change > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {change > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(change)}%
                </div>
            )}
        </div>
        <div>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{title}</h3>
            <div className="text-2xl font-bold tracking-tight">{value}</div>
        </div>
        {confidence !== undefined && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">AI Confidence</span>
                <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${confidence}%` }}
                            className="h-full bg-gradient-to-r from-ai-primary to-ai-secondary"
                        />
                    </div>
                    <span className="text-xs font-bold text-ai-secondary">{confidence}%</span>
                </div>
            </div>
        )}
        <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
            <Icon size={100} />
        </div>
    </Card>
);

const DashboardSkeleton = () => (
    <div className="space-y-10">
        <header className="flex justify-between items-end">
            <div className="space-y-2">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-64 h-10" />
            </div>
            <div className="flex gap-3">
                <Skeleton className="w-32 h-10" />
                <Skeleton className="w-32 h-10" />
            </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
        </div>
    </div>
);

const Dashboard = ({ setActiveTab }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '' });
    const [progress, setProgress] = useState(0);
    const [reportResult, setReportResult] = useState(null);
    const [toast, setToast] = useState(null);
    const [isAutomated, setIsAutomated] = useState(false);

    const FALLBACK_DATA = {
        total_value: 1284592.00,
        risk_score: "Low-Med",
        annual_return: 18.4,
        ai_consistency: 98.8,
        ai_confidence: 94,
        allocation: [
            { "name": "Equities", "value": 45, "color": "#3b82f6", "subAssets": ["AAPL", "MSFT", "NVDA"] },
            { "name": "Bonds", "value": 25, "color": "#06b6d4", "subAssets": ["US10Y", "TIP", "BND"] },
            { "name": "Crypto", "value": 15, "color": "#8b5cf6", "subAssets": ["BTC", "ETH", "SOL"] },
            { "name": "Cash", "value": 5, "color": "#64748b", "subAssets": ["USD", "EUR"] }
        ],
        risk_data: [
            { "name": "Jan", "current": 1000, "projected": 1000 },
            { "name": "Feb", "current": 1050, "projected": 1060 },
            { "name": "Mar", "current": 1100, "projected": 1120 },
            { "name": "Apr", "current": 1150, "projected": 1190 },
            { "name": "May", "current": 1220, "projected": 1260 },
            { "name": "Jun", "current": 1284, "projected": 1340 }
        ],
        ai_summary: {
            "quote": "System nodes operating in Local Mode. Strategy remains stable with current multi-asset diversification.",
            "target": "Capital Preservation",
            "confidence": "Local Algorithm"
        }
    };

    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchData = async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/portfolio/status`);
            if (response.ok) {
                const d = await response.json();
                setData(d);
                setLastUpdated(new Date().toLocaleTimeString());
            }
        } catch (err) {
            console.error("Dashboard Sync Failed:", err);
            setError(err.message);
            if (!data) setData(FALLBACK_DATA);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(true), 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isAutomated) return;

        const automationInterval = setInterval(() => {
            const actions = [
                "AI Agent: Mitigating regional volatility spike...",
                "Autonomous Log: Rebalancing crypto-hedged nodes.",
                "System: Quantum encryption keys refreshed.",
                "AI Thought: Detected correlation breakout in Tech.",
                "Report: Automated asset audit completed. 0 errors."
            ];
            const randomMsg = actions[Math.floor(Math.random() * actions.length)];
            setToast(randomMsg);
        }, 12000);

        return () => clearInterval(automationInterval);
    }, [isAutomated]);

    const handleAction = async (type) => {
        setModalConfig({ isOpen: true, type });
        setProgress(0);
        setReportResult(null);

        try {
            // Start fake progress for UI feel
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += Math.random() * 15;
                if (currentProgress < 90) setProgress(currentProgress);
            }, 400);

            // Actually call the backend
            const endpoint = type === 'Export PDF' ? '/api/portfolio/export' : '/api/portfolio/report';
            const method = type === 'Export PDF' ? 'POST' : 'GET';
            
            const req = await fetch(`${API_BASE_URL}${endpoint}`, { method });
            const result = await req.json();

            // Finish progress
            clearInterval(interval);
            setProgress(100);

            if (type === 'Export PDF') {
                setTimeout(() => {
                    setModalConfig({ isOpen: false, type: '' });
                    setToast(`System generated ${result.filename} successfully. Document ID: ${result.doc_id}`);
                }, 1000);
            } else {
                setReportResult(result.report);
                setToast("AI Strategic synthesis complete. Displaying securely.");
            }

        } catch (err) {
            setProgress(100);
            setTimeout(() => {
                setModalConfig({ isOpen: false, type: '' });
                setToast("Neural Feed Interrupted. Generator failed.");
            }, 1000);
        }
    };

    if (loading) return <main className="container mx-auto px-4 py-8"><DashboardSkeleton /></main>;

    if (error && !data) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
                <div className="p-6 rounded-full bg-rose-500/10 text-rose-500">
                    <AlertCircle size={64} />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Connection Protocol Failed</h2>
                    <p className="text-slate-500 max-w-md">The strategic dashboard could not establish a secure handshake with the AI backend.</p>
                </div>
                <button onClick={fetchData} className="btn-primary flex items-center gap-2 group">
                    <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    Re-initialize System
                </button>
            </div>
        );
    }

    const stats = [
        { title: 'Total Portfolio Value', value: `$${(data.total_value || 0).toLocaleString()}`, change: 12.5, icon: TrendingUp, color: 'bg-blue-500' },
        { title: 'Risk Score', value: data.risk_score || 'N/A', change: -2.1, icon: Shield, color: 'bg-emerald-500' },
        { title: 'Annual Return (Est)', value: `${data.annual_return || 0}%`, change: 4.2, icon: Activity, color: 'bg-violet-500' },
        { title: 'AI Consistency', value: `${data.ai_consistency || 0}%`, icon: Target, color: 'bg-amber-500', confidence: data.ai_confidence || 0 },
    ];

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="text-ai-secondary" size={20} />
                        <Badge variant="ai">System Verified</Badge>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold tracking-tight"
                    >
                        Investment Strategy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2"
                    >
                        Status: <span className="text-emerald-500 font-bold">Excellent</span>
                        <span className="w-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                            Last Synced: {lastUpdated || "--:--:--"}
                        </span>
                    </motion.p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsAutomated(!isAutomated)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg ${isAutomated
                            ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                    >
                        {isAutomated ? <><Zap size={16} /> Automation ON</> : <><ZapOff size={16} /> Automation OFF</>}
                    </button>
                    <button onClick={() => handleAction('Export PDF')} className="btn-outline text-sm py-2">Export PDF</button>
                    <button onClick={() => handleAction('Generate Report')} className="btn-primary text-sm py-2">Generate Report</button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>

            {/* AI Insights Section */}
            <ScrollReveal>
                <InsightsGrid onNavigate={() => setActiveTab('Insights')} />
            </ScrollReveal>

            {/* Main Analysis Row: Allocation & Rebalancing Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AllocationChart data={data.allocation} />
                <RebalancingPanel />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ScrollReveal delay={0.1}>
                        <div className="relative">
                            <RiskAnalysis data={data.risk_data} />
                            <button
                                onClick={() => setActiveTab('Risk')}
                                className="absolute top-8 right-8 btn-primary bg-ai-secondary border-ai-secondary text-[10px] py-1 px-3 flex items-center gap-1"
                            >
                                <Zap size={12} /> Open Risk Lab
                            </button>
                        </div>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ScrollReveal delay={0.2} direction="left">
                            <SectorPerformance />
                        </ScrollReveal>
                        <ScrollReveal delay={0.3} direction="right">
                            <AIPanel data={data.ai_summary} />
                        </ScrollReveal>
                    </div>
                </div>
                <div className="space-y-8">
                    {/* Secondary Sidebar Content if needed, otherwise this can be used for scrolling logs or more depth */}
                    <Card className="p-8 bg-ai-primary/5 border-ai-primary/20">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Zap size={18} className="text-ai-primary" /> Active Strategy Nodes
                        </h4>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <span className="text-xs font-medium">Node 0x{i}F-Secure</span>
                                    <Badge variant="success">Active</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() => { setModalConfig({ isOpen: false, type: '' }); setReportResult(null); }}
                title={modalConfig.type}
            >
                <div className="space-y-6 py-4">
                    {reportResult ? (
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-h-[50vh] overflow-y-auto">
                            <pre className="whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300 font-mono leading-relaxed">{reportResult}</pre>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
                                <div className="p-3 rounded-xl bg-ai-primary/10 text-ai-primary">
                                    <FileCheck size={24} />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                                        <span className="text-sm font-bold">Compiling AI Models</span>
                                        <span className="text-sm font-bold">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-ai-primary"
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed italic">
                                "Aggregating sector-level correlations and risk-adjusted alpha projections for the current cycle..."
                            </p>
                        </>
                    )}
                    <div className="flex gap-4 pt-4">
                        <button 
                            className={`flex-grow py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${reportResult ? 'bg-ai-primary text-white cursor-pointer hover:bg-ai-primary/90' : 'bg-slate-100 dark:bg-slate-800 opacity-50 cursor-not-allowed'}`}
                            onClick={() => reportResult ? setModalConfig({isOpen: false, type: ''}) : null}
                        >
                            {reportResult ? <><FileCheck size={18} /> Acknowledge</> : <><Download size={18} /> Processing...</>}
                        </button>
                    </div>
                </div>
            </Modal>

            <AnimatePresence>
                {toast && (
                    <Toast message={toast} onClose={() => setToast(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
