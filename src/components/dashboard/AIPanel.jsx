import React, { useState } from 'react';
import { Card, Badge, Modal } from '../ui/Base';
import { Sparkles, Zap, BrainCircuit, MessageSquareQuote, CheckCircle2, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

const AIPanel = ({ data }) => {
    const [showDetails, setShowDetails] = useState(false);

    // Provide fallback if data isn't loaded yet
    const summary = data || {
        quote: "Analyzing market conditions...",
        target: "Calculating...",
        confidence: "..."
    };

    return (
        <Card glow className="bg-white dark:bg-slate-900 border-ai-primary/20">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-ai-secondary rounded-xl flex items-center justify-center shadow-lg shadow-ai-secondary/20">
                    <BrainCircuit className="text-white" size={20} />
                </div>
                <div>
                    <h3 className="font-bold">AI Strategy Insights</h3>
                    <Badge variant="ai">System Active</Badge>
                </div>
            </div>

            <div className="relative p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-sm mb-6">
                <div className="absolute -top-3 left-6">
                    <MessageSquareQuote size={24} className="text-ai-secondary opacity-50 fill-ai-secondary" />
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 pt-2 italic">
                    "{summary.quote}"
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Zap size={14} className="text-yellow-500" />
                    <span>Optimization Target: <span className="text-ai-dark dark:text-ai-light">{summary.target}</span></span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Sparkles size={14} className="text-blue-500" />
                    <span>Confidence Factor: <span className="text-ai-dark dark:text-ai-light">{summary.confidence}</span></span>
                </div>
            </div>

            <button
                onClick={() => setShowDetails(true)}
                className="w-full mt-8 py-3 bg-gradient-to-r from-ai-primary to-ai-secondary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity transform active:scale-[0.98] shadow-lg shadow-ai-secondary/20"
            >
                <BrainCircuit size={18} />
                Detailed AI Breakdown
            </button>

            <Modal
                isOpen={showDetails}
                onClose={() => setShowDetails(false)}
                title="AI Cognitive Analysis"
            >
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                        <div className="p-3 rounded-2xl bg-violet-900/30 text-violet-400">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold mb-1">Sentiment Correlation</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Natural Language processing of over 40k earnings calls suggests a decoupled growth phase for Tech vs Traditional Retail.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Risk Parity</div>
                            <div className="text-lg font-bold text-ai-primary">Optimized</div>
                        </div>
                        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Compute Load</div>
                            <div className="text-lg font-bold text-ai-secondary">Minimal</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Primary Signals</h5>
                        {[
                            "Macro Liquidity: Bullish (+2.4σ)",
                            "VIX Correlation: Divergent",
                            "Supply Chain Resilience: Increasing"
                        ].map(signal => (
                            <div key={signal} className="flex items-center gap-2 text-sm font-medium">
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                {signal}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowDetails(false)}
                        className="w-full py-3 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 dark:bg-slate-800 transition-colors"
                    >
                        Close Analysis
                    </button>
                </div>
            </Modal>
        </Card>
    );
};

export default AIPanel;
