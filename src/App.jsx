import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Dashboard from './components/dashboard/Dashboard'
import PortfolioView from './components/views/PortfolioView'
import RiskView from './components/views/RiskView'
import InsightsView from './components/views/InsightsView'
import HomeView from './components/views/HomeView'
import ThoughtStream from './components/ui/ThoughtStream'
import AICopilot from './components/ui/AICopilot'
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderView = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeView setActiveTab={setActiveTab} />;
      case 'Dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'Portfolio':
        return <PortfolioView />;
      case 'Risk':
        return <RiskView />;
      case 'Insights':
        return <InsightsView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white transition-colors duration-300">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-grow container mx-auto px-4 py-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5, transition: { duration: 0.1 } }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <ThoughtStream />
        <AICopilot />
      </div>
    </ThemeProvider>
  )
}

export default App
