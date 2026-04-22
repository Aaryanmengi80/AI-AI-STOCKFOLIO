import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot, User, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';

const AICopilot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', content: 'Greeting Investor. I am your specialized quantitative copilot. I have context on your 45% Equity and 25% Bond allocation. How can I assist your strategy today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const userMsg = { role: 'user', content: message };
        setChatHistory(prev => [...prev, userMsg]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    context: {
                        allocation: { Equities: '45%', Bonds: '25%', Crypto: '15%', Commodities: '10%', Cash: '5%' },
                        risk_score: 'Low-Med'
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorText = errorData.detail || errorData.response || "Uplink synchronization failure.";
                setChatHistory(prev => [...prev, { role: 'ai', content: errorText }]);
                return;
            }

            const data = await response.json();
            setChatHistory(prev => [...prev, { role: 'ai', content: data.response || "Strategic analysis complete, but no output nodes returned data." }]);
        } catch (error) {
            setChatHistory(prev => [...prev, { role: 'ai', content: "Communication bridge failure. Ensure backend is running at port 8000." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? '60px' : '500px',
                            width: '380px'
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col mb-4"
                    >
                        {/* Header */}
                        <div className="p-4 bg-ai-primary text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <Sparkles size={18} className="animate-pulse" />
                                <span className="font-bold text-sm tracking-tight">AI STRATEGY COPILOT</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded">
                                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Chat Area */}
                                <div
                                    ref={scrollRef}
                                    className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/20"
                                >
                                    {chatHistory.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                                ? 'bg-ai-primary text-white rounded-tr-none shadow-lg shadow-ai-primary/10'
                                                : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none font-medium'
                                                }`}>
                                                <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] font-black uppercase tracking-widest">
                                                    {msg.role === 'ai' ? <><Bot size={12} /> Copilot Agent</> : <><User size={12} /> Dr. Investor</>}
                                                </div>
                                                <div className="leading-relaxed">{msg.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                                <Loader2 className="animate-spin text-ai-primary" size={16} />
                                                <span className="text-xs font-bold animate-pulse">Analyzing Strategy...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Ask about your 25% Bond weight..."
                                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-ai-primary transition-all outline-none"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!message.trim() || isLoading}
                                            className="absolute right-2 top-1.5 p-2 bg-ai-primary text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-ai-primary/20"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                    <div className="mt-2 text-[8px] text-center text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                                        LLM Engine: Gemini 1.5 Flash • Strategic Context Active
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-3 active:scale-90 ${isOpen
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-ai-primary text-white hover:bg-ai-primary/90 hover:shadow-ai-primary/30 flex px-6'
                    }`}
            >
                {isOpen ? <X size={24} /> : (
                    <>
                        <MessageSquare size={24} />
                        <span className="font-bold text-sm">ASK COPILOT</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default AICopilot;
