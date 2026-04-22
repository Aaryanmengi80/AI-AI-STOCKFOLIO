import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 opacity-60">
                    <div className="w-6 h-6 bg-ai-primary rounded flex items-center justify-center text-[10px] text-white font-bold">S</div>
                    <span className="text-sm font-medium">Smart Portfolio AI v1.0.4</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Powered by Advanced Generative AI | <span className="text-ai-primary font-medium">Hackathon Prototype</span>
                </p>
                <div className="flex gap-4 text-xs text-slate-400">
                    <button onClick={() => alert("Privacy Policy: All data is encrypted and remains in your local environment.")} className="hover:text-ai-primary">Privacy</button>
                    <button onClick={() => alert("Terms of Service: This is an AI-driven simulation for educational purposes.")} className="hover:text-ai-primary">Terms</button>
                    <button onClick={() => alert("Support: For technical assistance, visit our developer resources.")} className="hover:text-ai-primary">Support</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
