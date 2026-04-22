import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../ui/Base';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const data = [
    { name: 'Tech', value: 12.5, status: 'bullish' },
    { name: 'Finance', value: -2.4, status: 'bearish' },
    { name: 'Health', value: 5.8, status: 'neutral' },
    { name: 'Energy', value: -8.1, status: 'bearish' },
    { name: 'Retail', value: 15.2, status: 'bullish' },
    { name: 'Crypto', value: 24.8, status: 'bullish' },
];

const SectorPerformance = () => {
    const { isDarkMode } = useTheme();
    return (
        <Card className="h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold">Detailed Sector Performance</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Relative performance vs. Baseline (24h)</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => alert("Sector Deep-Dive: Retail sector is currently exhibiting a 'Strong Buy' pattern due to consumer sentiment bounce.")}
                        className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                    >
                        Top: Retail
                    </button>
                </div>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#e2e8f010" : "#e2e8f0"} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: isDarkMode ? '#94a3b8' : '#64748b', fontWeight: 600 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: isDarkMode ? '#94a3b8' : '#64748b' }}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                            cursor={{ fill: isDarkMode ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.1)' }}
                            contentStyle={{
                                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '12px',
                                border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.5)' : '1px solid rgba(203, 213, 225, 0.8)',
                                boxShadow: isDarkMode ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#1e293b' }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={35}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.value > 0 ? '#10b981' : '#f43f5e'}
                                    fillOpacity={0.8}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-3">
                {data.slice(0, 3).map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${item.value > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            <span className="text-sm font-semibold">{item.name}</span>
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-bold ${item.value > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {item.value > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                            {Math.abs(item.value)}%
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default SectorPerformance;
