import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
  onSelectQuickTrip: (origin: string, dest: string, days: number, travelers: number, budget: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning, onSelectQuickTrip }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-rose-500/10 blur-[130px] pointer-events-none rounded-full" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Proposition and Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-rose-400">
              <Sparkles className="h-4 w-4" />
              <span>AI Workflow Automation with n8n Cloud</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.1] text-balance">
              Personalized Travel Plans, Handcrafted in Seconds.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Tell us your starting point, dream destination, and budget. Our n8n workflow analyzes flight corridors, local sights, pacing, and lodging to dispatch a tailored day-by-day travel plan directly to your inbox.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onStartPlanning}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-lg shadow-rose-950/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>Plan Your Next Trip</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Popular quick starts:</span>
                <button
                  type="button"
                  onClick={() => onSelectQuickTrip('Mumbai', 'Goa', 4, 2, 35000)}
                  className="text-slate-200 hover:text-rose-400 underline underline-offset-4 transition-colors"
                >
                  Mumbai → Goa
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onSelectQuickTrip('Delhi', 'Kyoto', 7, 2, 120000)}
                  className="text-slate-200 hover:text-rose-400 underline underline-offset-4 transition-colors"
                >
                  Delhi → Kyoto
                </button>
              </div>
            </div>

            {/* Proof metrics adjacency */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-bold text-white font-display tabular-nums">480+</p>
                <p className="text-xs text-slate-400 mt-0.5">Trips Automated</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-display tabular-nums">&lt; 30s</p>
                <p className="text-xs text-slate-400 mt-0.5">Workflow Response</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-display tabular-nums">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Tailored Itineraries</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_travel_scenic_1790760945456.jpg"
                alt="Scenic mountain pass overlooking turquoise alpine lake"
                className="w-full h-[380px] sm:h-[440px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-80" />

              {/* Floating visual insight card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-white">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="flex items-center gap-1 text-rose-400 font-medium">
                    <MapPin className="h-3 w-3" />
                    <span>Real-Time n8n Webhook</span>
                  </span>
                  <span className="tabular-nums">Live Endpoint</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  Intelligent Route & Budget Optimization
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>Instant dispatch</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    <span>Direct email delivery</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
