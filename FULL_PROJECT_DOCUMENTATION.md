# AI STOCKFOLIO: FULL PROJECT ARCHITECTURAL SPECIFICATION
*The Ultimate Technical Manifesto for Autonomous Wealth Intelligence*

---

## 1. PROJECT OVERVIEW
**AI STOCKFOLIO** is an enterprise-grade, autonomous quantitative investment dashboard. It merges institutional financial logic with a premium "Industrial Dark" aesthetic. The platform doesn't just display data; it uses advanced AI (Google Gemini 2.0) to analyze market signals, suggest rebalancing strategies, and simulate complex risk scenarios.

---

## 2. SYSTEM ARCHITECTURE & DATA FLOW

### 2.1 The Backend (Strategy Gateway)
- **Engine**: FastAPI (Python 3.10+) chosen for asynchronous performance.
- **AI Core**: Google Gemini 2.0 Flash via `google-generativeai` SDK.
- **Primary Responsibility**:
  - Serves portfolio metadata (Total Value, Returns, etc.).
  - Calculates asset allocation drift.
  - Generates "Flash Insights" using LLM-driven market analysis.
  - Provies a Chat endpoint for real-time strategic consultation.
- **Port**: Defaults to `8000`.

### 2.2 The Frontend (Command Center)
- **Framework**: React 19 + Vite (for ultra-fast HMR).
- **Styling**: Tailwind CSS 4.0 + PostCSS.
- **Animations**: Framer Motion 12.
- **Visuals**: Recharts (for complex quantitative graphing) and Lucide-React (iconography).
- **Primary Responsibility**:
  - Orchestrates the "Strategic Viewport."
  - Manages real-time UI state (Tabs, Modals, Toasts).
  - Handles fallback "Local Intelligence" if the backend is unreachable.

---

## 3. DIRECTORY STRUCTURE & FILE DETAILS

### 3.1 Backend Layout (`/backend`)
- **`main.py`**: The central nervous system. Contains all API routes (`/api/portfolio/status`, `/api/ai/chat`, etc.) and the Gemini integration logic.
- **`.env`**: Stores the `GEMINI_API_KEY`.
- **`requirements.txt`**: Lists dependencies (`fastapi`, `uvicorn`, `google-generativeai`).

### 3.2 Frontend Layout (`/src`)
- **`App.jsx`**: The application shell. Handles navigation state and view rendering.
- **`components/dashboard/`**:
  - **`Dashboard.jsx`**: The primary "Mission Control" page. Manages data fetching, stat grids, and automation loops.
  - **`AllocationChart.jsx`**: Uses Recharts `PieChart` to visualize the $1.2M portfolio distribution.
  - **`RebalancingPanel.jsx`**: Lists tactical moves (e.g., "Decrease US Treasury Bonds").
  - **`RiskAnalysis.jsx`**: Visualizes Portfolio Value vs. Projections over time.
  - **`AIPanel.jsx`**: Displays a generative summary of the current strategy.
  - **`SectorPerformance.jsx`**: Tracks relative growth across Tech, Energy, etc.
- **`components/views/`**:
  - **`PortfolioView.jsx`**: Deep-dive into individual asset nodes.
  - **`RiskView.jsx`**: The "Tactical Safety Lab" for stress-testing.
  - **`InsightsView.jsx`**: Secondary feed of strategic intelligence.
- **`components/ui/`**:
  - **`Base.jsx`**: Core design tokens (`Card`, `Badge`, `Modal`, `Toast`).
  - **`AICopilot.jsx`**: The persistent chat overlay for LLM interaction.
  - **`ThoughtStream.jsx`**: Bottom-fixed scrolling activity log.
- **`context/`**:
  - **`ThemeContext.jsx`**: Enforces the Industrial Dark theme and manages global UI preferences.

---

## 4. COMPONENT DEEP-DIVE (SMALL DETAILS)

### 4.1 UI Consistency Details
- **Glow Effects**: Cards use a custom `glow` prop that adds a subtle drop-shadow with the primary AI color.
- **Glassmorphism**: Containers use `backdrop-filter: blur(12px)` and semi-transparent backgrounds to create depth.
- **Color Palette**:
  - `bg-slate-950`: The foundation.
  - `emerald-500`: Indicators for profit and growth.
  - `rose-500`: Indicators for risk and loss.
  - `ai-primary (#3b82f6)`: Strategic elements.

### 4.2 Automation Logic
In `Dashboard.jsx`, the **Automation ON** switch triggers a background `setInterval` every 12 seconds. It simulates an autonomous agent performing "Asset Audits" and "Encryption Refreshing," updating the user via the `Toast` system.

### 4.3 Data Fetching & Fallbacks
The system is designed for high availability. In `Dashboard.jsx` (lines 86-107), if the `fetch` from `localhost:8000` fails, the system automatically switches to `FALLBACK_DATA`, ensuring the user always sees a functional prototype.

---

## 5. RECHARTS IMPLEMENTATION
- **Portfolio Projection**: Uses a `ComposedChart` in `RiskAnalysis.jsx`.
  - `Area`: Shows historical/current value with a gradient fill.
  - `Line`: Shows the "AI Projected Path."
  - `Bar`: Visualizes daily volume at the bottom of the chart.

---

## 6. AI INTERACTION SPECIFICATION
When a user types in the `AICopilot`, the message is sent to `/api/ai/chat`. 
- **Context Injection**: The backend receives not just the message, but the current portfolio state (Context).
- **Tone Control**: The AI is prompted to act as "Antigravity AI," a professional senior quant.
- **Offline Logic**: If the Gemini API key is missing, the backend uses a "Keyword-Based Smart Mock" (lines 174-182 in `main.py`) to provide relevant-sounding but hardcoded responses about Bonds, Crypto, and Equities.

---

## 7. INSTALLATION & EXECUTION GUIDE

### 7.1 Backend Setup
1. `cd backend`
2. `pip install -r requirements.txt`
3. Add `GEMINI_API_KEY` to `.env`
4. `python main.py` (Runs on port 8000)

### 7.2 Frontend Setup
1. `npm install`
2. `npm run dev` (Runs on port 5173)

---

## 8. STRATEGIC ROADMAP
1. **Phase 1 (Complete)**: UI Design, Component Architecture, Mock/Sim Logic.
2. **Phase 2 (Current)**: Integration with Gemini 2.0 Flash for real-time logic.
3. **Phase 3 (Next)**: Real-world API integration (Alpaca/CoinGecko) to replace simulators.

---
*Created by Antigravity AI | Version 1.0.0*
