import React from 'react';
import { GitBranch, Cpu, MailCheck, ExternalLink, Terminal, Shield } from 'lucide-react';

interface WorkflowSectionProps {
  n8nUrl: string;
  onOpenIntegration: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({
  n8nUrl,
  onOpenIntegration,
}) => {
  return (
    <section id="workflow" className="scroll-mt-20 py-16 lg:py-24 border-t border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
            Architecture & Pipeline
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mt-1 text-balance">
            Automated Travel Planning via n8n Cloud
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            The travel requirements you submit are channeled directly into an n8n webhook workflow that chains intelligent decision nodes, weather checking, activity curations, and email triggers without manual intervention.
          </p>
        </div>

        {/* 3 Steps Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-3">
                <span className="font-mono">01. INGESTION</span>
                <GitBranch className="h-4 w-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Webhook Form Trigger
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Captures origins, destinations, calendar days, group size, and budget via multi-part parameters dispatched securely to n8n Cloud.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
              payload: field-0..5 + preferences
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-3">
                <span className="font-mono">02. SYNTHESIS</span>
                <Cpu className="h-4 w-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                AI Agent & Optimization
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                The n8n workflow executes custom logic nodes to split daily budgets, calculate travel times, balance pacing, and synthesize authentic local spots.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
              model: multi-step itinerary generator
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-3">
                <span className="font-mono">03. DISPATCH</span>
                <MailCheck className="h-4 w-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Email Delivery Node
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Formats a structured, easy-to-read travel plan complete with morning, afternoon, and evening recommendations, then emails the traveler directly.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
              protocol: automated SMTP / Gmail node
            </div>
          </div>

        </div>

        {/* Integration Callout Bar */}
        <div className="mt-8 rounded-xl border border-slate-800/90 bg-slate-900/90 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Active n8n Workflow Endpoint</p>
              <p className="text-[11px] text-slate-400 font-mono truncate max-w-xs sm:max-w-lg">
                {n8nUrl}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenIntegration}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors"
            >
              Test & Configure
            </button>
            <a
              href={n8nUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              title="Open raw n8n form in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
