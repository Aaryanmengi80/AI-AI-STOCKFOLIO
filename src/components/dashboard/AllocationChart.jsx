import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, Badge } from '../ui/Base';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AllocationChart = ({ data = [] }) => {
    const { isDarkMode } = useTheme();
    const [activeIndex, setActiveIndex] = useState(null);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <Card className="h-full min-h-[520px] flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold">Asset Allocation</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Diversification by Strategy</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="ai">Diversified</Badge>
                </div>
            </div>

            <div className="flex-grow min-h-[180px] relative">
                {data.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-ai-primary" size={32} />
                    </div>
                ) : (
                    <>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    animationBegin={200}
                                    animationDuration={1500}
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            fillOpacity={activeIndex === index || activeIndex === null ? 1 : 0.6}
                                            style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                                        borderRadius: '16px',
                                        border: isDarkMode ? '1px solid rgba(51, 65, 85, 0.5)' : '1px solid rgba(203, 213, 225, 0.8)',
                                        boxShadow: isDarkMode ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                                    }}
                                    itemStyle={{ color: isDarkMode ? '#f8fafc' : '#1e293b' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active</div>
                            <span className="text-xl font-black">{data.length} Classes</span>
                        </div>
                    </>
                )}
            </div>

            {data.length > 0 && (
                <div className="mt-8 space-y-4">
                    {data.map((item, index) => (
                        <div
                            key={item.name}
                            className={`transition-all duration-300 p-2 rounded-xl border ${activeIndex === index ? 'bg-slate-100 dark:bg-slate-800 border-ai-primary/30 shadow-sm' : 'border-transparent'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-md" style={{ backgroundColor: item.color }} />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold">{item.name}</span>
                                        <span className="text-sm font-bold">{item.value}%</span>
                                    </div>
                                    {activeIndex === index && item.subAssets && (
                                        <div className="flex gap-2 mt-2">
                                            {item.subAssets.map(sub => (
                                                <span key={sub} className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-mono">
                                                    {sub}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default AllocationChart;
