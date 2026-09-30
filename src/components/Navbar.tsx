import React from 'react';
import { Activity, Compass } from 'lucide-react';

interface NavbarProps {
  onOpenIntegration: () => void;
  onScrollToForm: () => void;
  isN8nOnline: boolean | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenIntegration,
  onScrollToForm,
  isN8nOnline,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element brand wordmark */}
        <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90">
          <Compass className="h-5 w-5 text-rose-500" />
          <span className="font-display tracking-wide">VoyagePlan</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#planner"
            className="hover:text-white transition-colors"
          >
            Plan Trip
          </a>
          <a
            href="#destinations"
            className="hover:text-white transition-colors"
          >
            Featured Destinations
          </a>
          <a
            href="#workflow"
            className="hover:text-white transition-colors"
          >
            n8n Automation
          </a>
          <a
            href="#sample"
            className="hover:text-white transition-colors"
          >
            Sample Itinerary
          </a>
        </nav>

        {/* Zone 3: Primary interactive actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenIntegration}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 rounded-md transition-colors"
            title="Inspect n8n webhook and connection status"
          >
            <Activity className={`h-3.5 w-3.5 ${isN8nOnline === true ? 'text-emerald-400' : isN8nOnline === false ? 'text-rose-400' : 'text-amber-400'}`} />
            <span className="hidden sm:inline">n8n Connected</span>
          </button>

          <button
            type="button"
            onClick={onScrollToForm}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-md shadow-sm transition-colors whitespace-nowrap"
          >
            Create Plan
          </button>
        </div>
      </div>
    </header>
  );
};
