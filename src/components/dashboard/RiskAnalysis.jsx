import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { Card, Badge } from '../ui/Base';
import { ShieldCheck, TrendingDown, Info } from 'lucide-react';

const RiskAnalysis = ({ data = [] }) => {
    return (
        <Card className="min-h-[500px] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">Growth & Risk Simulation</h3>
                        <Badge variant="success">Low Volatility</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Monte Carlo projection vs. Historical Performance</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-ai-primary" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Actual Equity</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-ai-secondary rounded bg-slate-900" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">AI Projection</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-slate-700" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Market Volume</span>
                    </div>
                </div>
            </div>

            <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f080" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                            tickFormatter={(value) => `$${value / 1000}M`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                borderRadius: '16px',
                                border: '1px solid rgba(51, 65, 85, 0.5)',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#f8fafc' }}
                            cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Bar
                            dataKey="volume"
                            barSize={40}
                            fill="#1e293b"
                            opacity={0.3}
                            radius={[4, 4, 0, 0]}
                        />
                        <Area
                            type="monotone"
                            dataKey="current"
                            stroke="#3b82f6"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorActual)"
                        />
                        <Area
                            type="monotone"
                            dataKey="projected"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            strokeDasharray="8 6"
                            fill="transparent"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-100 dark:border-slate-800 pt-8 pb-2">
                <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center gap-1">
                        Max Drawdown <Info size={10} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-rose-500">-8.4%</span>
                        <TrendingDown size={18} className="text-rose-400" />
                    </div>
                </div>
                <div className="space-y-1 md:border-l md:pl-6 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest flex items-center gap-1">
                        Sharpe Ratio <Info size={10} />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald-500">2.14</span>
                        <ShieldCheck size={18} className="text-emerald-400" />
                    </div>
                </div>
                <div className="space-y-1 md:border-l md:pl-6 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Volatility</div>
                    <div className="text-2xl font-bold text-amber-500">12.2%</div>
                </div>
                <div className="space-y-1 md:border-l md:pl-6 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Alpha Gen</div>
                    <div className="text-2xl font-bold text-ai-primary">4.82%</div>
                </div>
            </div>
        </Card>
    );
};

export default RiskAnalysis;
