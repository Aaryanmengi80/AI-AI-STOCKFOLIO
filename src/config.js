/**
 * Global Configuration for the AI Stockfolio
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const APP_CONFIG = {
    REFRESH_INTERVAL: 30000, // 30 seconds
    APP_NAME: 'Antigravity AI',
    VERSION: '1.0.0-Serious'
};
