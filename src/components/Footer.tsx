import React from 'react';
import { Compass } from 'lucide-react';

interface FooterProps {
  onOpenIntegration: () => void;
  onScrollToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenIntegration, onScrollToForm }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#070a10] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-rose-500" />
            <span className="text-lg font-bold text-white font-display">VoyagePlan</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button
              type="button"
              onClick={onScrollToForm}
              className="hover:text-white transition-colors"
            >
              Plan Trip
            </button>
            <a href="#destinations" className="hover:text-white transition-colors">
              Destinations
            </a>
            <a href="#workflow" className="hover:text-white transition-colors">
              n8n Workflow
            </a>
            <a href="#sample" className="hover:text-white transition-colors">
              Sample Itinerary
            </a>
            <button
              type="button"
              onClick={onOpenIntegration}
              className="text-rose-400 hover:text-rose-300 transition-colors"
            >
              Webhook Settings
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} VoyagePlan. Intelligent travel automation orchestrated with n8n.</p>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>·</span>
            <span>Terms</span>
            <span>·</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
