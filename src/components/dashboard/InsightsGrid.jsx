import React from 'react';
import { motion } from 'framer-motion';
import { FlashCard } from '../ui/Base';
import { Lightbulb, ShieldCheck, Zap, BarChart3, Info, Loader2 } from 'lucide-react';

const iconMap = {
    Zap: Zap,
    ShieldCheck: ShieldCheck,
    BarChart3: BarChart3,
    Lightbulb: Lightbulb
};

const InsightsGrid = ({ onNavigate }) => {
    const [insights, setInsights] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('http://localhost:8000/api/market/insights')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setInsights(data);
                } else {
                    console.warn("Expected array for insights, got:", data);
                    setInsights([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch insights:", err);
                setInsights([]);
                setLoading(false);
            });
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    AI Flash Insights
                    <Info size={16} className="text-slate-400" />
                </h3>
                <button
                    onClick={onNavigate}
                    className="text-sm font-medium text-ai-primary hover:underline"
                >
                    View All Insights
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[160px]">
                {loading ? (
                    <div className="col-span-full flex items-center justify-center p-12">
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Loading Insights...</div>
                        <Loader2 className="animate-spin text-ai-primary" size={32} />
                    </div>
                ) : (
                    insights.map((insight, idx) => (
                        <motion.div
                            key={insight.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                        >
                            <FlashCard
                                {...insight}
                                icon={iconMap[insight.icon] || Info}
                            />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default InsightsGrid;
