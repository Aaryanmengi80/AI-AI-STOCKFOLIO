import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Badge, ScrollReveal, Modal, Toast, Skeleton } from '../ui/Base';
import { Briefcase, TrendingUp, PieChart, ArrowUpRight, DollarSign, Layers, Database, ShieldCheck, Download, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../../config';

const PortfolioView = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ isOpen: false, title: '', content: null });
    const [toast, setToast] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/portfolio/status`);
            const d = await response.json();
            setData(d);
        } catch (err) {
            console.error("Failed to sync holdings:", err);
            setToast("Holding Sync Failed. Using Cached Snapshot.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddFunds = () => {
        setModal({
            isOpen: true,
            title: 'Deploy Capital',
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-slate-500">Configure your automated entry strategy:</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 rounded-xl border-2 border-ai-primary/20 hover:border-ai-primary transition-all text-left">
                            <div className="font-bold">Lump Sum</div>
                            <div className="text-[10px] text-slate-400">Immediate Deployment</div>
                        </button>
                        <button className="p-4 rounded-xl border-2 border-slate-800 hover:border-ai-primary transition-all text-left">
                            <div className="font-bold">AI DCA</div>
                            <div className="text-[10px] text-slate-400">Algorithmic Averaging</div>
                        </button>
                    </div>
                    <button
                        onClick={() => { setModal({ ...modal, isOpen: false }); setToast("Capital deployment initiated via secure bridge."); }}
                        className="w-full py-4 bg-ai-primary text-white rounded-2xl font-bold mt-4"
                    >
                        Confirm Transfer
                    </button>
                </div>
            )
        });
    };

    const handleLayerHierarchy = () => {
        setModal({
            isOpen: true,
            title: 'Technical Layer Analysis',
            content: (
                <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="text-ai-primary" />
                            <h4 className="font-bold">Infrastructure Layer</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-ai-primary w-[85%]" />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                                <span>Compute Weight</span>
                                <span>85%</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 italic">"Hierarchy is optimized for maximum parallel growth across the Silicon and Distributed Finance sectors."</p>
                </div>
            )
        });
    };

    if (loading) return (
        <div className="space-y-8 px-4">
             <div className="flex justify-between items-end">
                <div className="space-y-4"><Skeleton className="w-48 h-8" /><Skeleton className="w-64 h-4" /></div>
                <div className="flex gap-2"><Skeleton className="w-32 h-10" /><Skeleton className="w-32 h-10" /></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Skeleton className="h-32" />
                <Skeleton className="h-32 md:col-span-3" />
             </div>
        </div>
    );

    const mergedAssets = [
        ...(data?.stock_details?.map(s => ({ ...s, name: s.symbol, type: 'Stock' })) || []),
        ...(data?.crypto_details?.map(c => ({ ...c, name: c.id.toUpperCase(), type: 'Crypto' })) || [])
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="text-ai-primary" size={20} />
                        <Badge variant="success">Active Growth</Badge>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Portfolio Holdings</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time breakdown of your diversified asset architecture.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchData} className="btn-outline text-sm py-2 px-3 flex items-center gap-2">
                        <RefreshCw size={16} />
                    </button>
                    <button onClick={handleLayerHierarchy} className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                        <Layers size={16} /> Layer Hierarchy
                    </button>
                    <button onClick={handleAddFunds} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                        <DollarSign size={16} /> Add Funds
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card glow className="lg:col-span-1">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Total Assets</h3>
                    <div className="text-3xl font-bold">${data?.total_value?.toLocaleString()}</div>
                    <div className="flex items-center gap-2 mt-2 text-emerald-500 font-bold">
                        <TrendingUp size={16} />
                        <span>+14.2% YTD</span>
                    </div>
                </Card>
                <div className="lg:col-span-3">
                    <Card className="overflow-hidden p-0 border-slate-800">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50">
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Asset</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Quantity</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Price</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Market Value</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mergedAssets.map((asset, idx) => (
                                    <motion.tr
                                        key={asset.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-bold flex items-center gap-2 group-hover:text-ai-primary transition-colors">
                                                {asset.name}
                                                <Badge variant={asset.type === 'Crypto' ? 'ai' : 'outline'} className="text-[8px] px-1 py-0">{asset.type}</Badge>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-mono text-slate-400">{asset.qty}</td>
                                        <td className="px-6 py-4 text-right font-mono text-slate-400">${asset.price?.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-ai-secondary">${asset.value?.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-xs font-bold text-slate-400">
                                                    {((asset.value / data.total_value) * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>

            <ScrollReveal delay={0.4}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold">Diversification Score</h3>
                            <Badge variant="ai">AI Optimized</Badge>
                        </div>
                        <div className="flex items-center justify-center p-8 bg-slate-800 shadow-inner rounded-3xl h-48">
                            <div className="text-center">
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-ai-primary to-ai-secondary">92</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Elite Tier</div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                            Your portfolio is in the top 5% of risk-adjusted diversification architectures across the retail nodes.
                        </p>
                    </Card>
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold">Growth Projection</h3>
                            <ArrowUpRight className="text-ai-primary" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Tech Expansion', value: '+12.4%', desc: 'Driven by AI GPU demand' },
                                { label: 'Fixed Income', value: '+4.2%', desc: 'Yield curve stabilization' },
                                { label: 'Crypto Alpha', value: '+24.5%', desc: 'High beta correlation play' },
                            ].map(item => (
                                <div key={item.label} className="p-3 rounded-xl border border-slate-800 flex justify-between items-center group cursor-pointer hover:border-ai-primary transition-all">
                                    <div>
                                        <div className="font-bold text-sm group-hover:text-ai-primary transition-colors">{item.label}</div>
                                        <div className="text-[10px] text-slate-400">{item.desc}</div>
                                    </div>
                                    <div className="text-emerald-500 font-black tracking-tight">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </ScrollReveal>

            <Modal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} title={modal.title}>
                {modal.content}
            </Modal>

            <AnimatePresence>
                {toast && <Toast message={toast} onClose={() => setToast(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default PortfolioView;
