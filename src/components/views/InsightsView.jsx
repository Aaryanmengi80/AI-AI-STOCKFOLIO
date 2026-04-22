import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Badge, ScrollReveal, Modal, Toast, Skeleton } from '../ui/Base';
import { BarChart2, Lightbulb, Zap, Globe, MessageSquareCode, Sparkles, FileSearch, Send, Download, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../../config';

const InsightsView = () => {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportModal, setReportModal] = useState({ isOpen: false, title: '' });
    const [toast, setToast] = useState(null);

    const fetchInsights = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/market/insights`);
            const data = await response.json();
            setInsights(data);
        } catch (err) {
            console.error("Insights fetch failed:", err);
            setToast("Neural Feed Interrupted.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    const generateDeepDive = () => {
        setReportModal({ isOpen: true, title: "Custom Global Portfolio Deep Dive" });
        setToast("Allocating multi-agent synthesis...");
    };

    const openAnalysis = (title) => {
        setReportModal({ isOpen: true, title });
    };

    if (loading) return (
        <div className="space-y-8 px-4">
            <Skeleton className="w-64 h-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48" />
                <Skeleton className="h-48" />
                <Skeleton className="h-48" />
                <Skeleton className="h-48" />
            </div>
        </div>
    );

    const handleDownload = () => {
        setToast("Aggregating document from Neural Core...");
        
        // Simulating the delay of a PDF generator hitting the backend
        setTimeout(() => {
            const reportText = `AI COGNITIVE REPORT: ${reportModal.title}\n-----------------------------------\n\nThis report synthesizes over 12 million data points across global indices and social sentiment clusters.\n\n"Probability of sector-wide rebalancing remains > 82% for the upcoming cycle."\n\n[CONFIDENTIAL AI ANALYSIS - DO NOT DISTRIBUTE]`;
            const blob = new Blob([reportText], { type: 'text/plain' });
            
            const element = document.createElement('a');
            element.href = URL.createObjectURL(blob);
            element.download = `AI_Strategic_Report_${reportModal.title.replace(/\s+/g, '_')}.txt`;
            document.body.appendChild(element); // Required for Firefox
            element.click();
            document.body.removeChild(element);
            
            setReportModal({ ...reportModal, isOpen: false });
            setToast("Analysis Document Downloaded Successfully.");
        }, 1200);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="text-amber-500" size={20} />
                        <Badge variant="ai">AI Generative Reports</Badge>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">AI Insights Engine</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Deep synthesis of global financial data and sentiment correlations.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchInsights} className="btn-outline text-sm py-2 px-3 flex items-center gap-2">
                        <RefreshCw size={16} />
                    </button>
                    <button onClick={() => setToast("Redirecting to Advanced Heatmap Cluster...")} className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                        <Globe size={16} /> Global Heatmap
                    </button>
                    <button onClick={generateDeepDive} className="btn-primary border-ai-primary bg-ai-primary hover:bg-ai-primary/90 text-sm py-2 px-4 flex items-center gap-2">
                        <Sparkles size={16} /> Generate Deep Dive
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {insights.map((insight, idx) => (
                    <motion.div
                        key={insight.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group"
                    >
                        <Card glow className="h-full border-l-4 border-l-ai-primary group-hover:border-l-ai-secondary transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-black tracking-tight group-hover:text-ai-primary transition-colors">{insight.title}</h3>
                                <Badge variant={insight.badge === 'Urgent' ? 'danger' : 'info'}>{insight.badge || 'New'}</Badge>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                {insight.content}
                            </p>
                            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center`}>
                                        <MessageSquareCode size={16} className={`text-ai-${insight.color || 'primary'}`} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{insight.badge}</span>
                                </div>
                                <button
                                    onClick={() => openAnalysis(insight.title)}
                                    className="text-xs font-bold text-ai-primary hover:underline"
                                >
                                    Read Analysis {'→'}
                                </button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <ScrollReveal delay={0.3}>
                <Card className="bg-slate-100 dark:bg-slate-800/50 p-12 text-center">
                    <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl mb-2">
                            <Zap className="text-ai-primary animate-pulse" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold">Predictive Sentiment Feed</h2>
                        <p className="text-slate-500">
                            Our LLM agents are currently parsing over 400k real-time news nodes.
                            The next major alpha signal is expected in ~3 minutes.
                        </p>
                        <div className="w-full max-w-sm h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-4">
                            <motion.div
                                className="h-full bg-ai-primary"
                                initial={{ width: 0 }}
                                animate={{ width: '85%' }}
                                transition={{ duration: 180, repeat: Infinity }}
                            />
                        </div>
                    </div>
                </Card>
            </ScrollReveal>

            <Modal
                isOpen={reportModal.isOpen}
                onClose={() => setReportModal({ ...reportModal, isOpen: false })}
                title="AI Cognitive Report"
            >
                <div className="space-y-6">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-ai-primary/5 text-ai-primary border border-ai-primary/20">
                        <FileSearch size={24} />
                        <div className="font-bold">{reportModal.title}</div>
                    </div>
                    <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
                        <p>This report synthesizes over 12 million data points across global indices and social sentiment clusters.</p>
                        <p className="font-bold text-slate-800 dark:text-white">"Probability of sector-wide rebalancing remains {'>'} 82% for the upcoming cycle."</p>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button 
                            onClick={handleDownload}
                            className="flex-grow py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-700 transition-colors rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                            <Download size={18} /> Download Full Analysis
                        </button>
                        <button 
                            onClick={() => {
                                setReportModal({ ...reportModal, isOpen: false });
                                setToast("Analysis seamlessly transmitted to registered secure agents.");
                            }}
                            className="p-3 bg-ai-primary hover:bg-ai-primary/90 transition-colors text-white rounded-xl"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </Modal>

            <AnimatePresence>
                {toast && <Toast message={toast} onClose={() => setToast(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default InsightsView;
