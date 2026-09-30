import React, { useState } from 'react';
import { Sun, Sunset, Moon, Coffee, Utensils, Compass, Sparkles } from 'lucide-react';

interface DayPlan {
  day: number;
  title: string;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  foodTip: string;
  dailySpendEst: string;
}

const SAMPLE_DAYS: DayPlan[] = [
  {
    day: 1,
    title: 'Arrival, Portuguese Quarters & Sunset Sail',
    theme: 'Coastal Settling & Old World Charm',
    morning: 'Land at Dabolim / Mopa Airport, check-in to coastal boutique hotel, leisurely brunch with kokum cooler.',
    afternoon: 'Wander through the pastel-painted lanes of Fontainhas in Panjim, visit historic azulejo tile workshops.',
    evening: 'Mandovi river cruise at golden hour followed by riverside grilled pomfret and feni cocktails at a traditional tavern.',
    foodTip: 'Try the classic Goan poi bread with prawn balchão at Viva Panjim.',
    dailySpendEst: '₹4,500 for two',
  },
  {
    day: 2,
    title: 'Hidden Coves & Cliffside Lookouts',
    theme: 'Beach Hikes & Coastal Vistas',
    morning: 'Early morning swim at quiet Ashwem beach, fresh smoothie bowls at an open-air beachfront cafe.',
    afternoon: 'Short coastal trail walk up to Chapora Fort for panoramic sea views, browse local artisan leather & spice market.',
    evening: 'Arambol cliffside drum circle and sunset viewpoint, wood-fired sourdough pizza under palm trees.',
    foodTip: 'Fresh kingfish rava fry at a shack on Morjim beach.',
    dailySpendEst: '₹3,800 for two',
  },
  {
    day: 3,
    title: 'Spice Plantations & Heritage Backwaters',
    theme: 'Flora, Aromas & River Cruise',
    morning: 'Guided eco-walk inside Sahakari Spice Farm in Ponda with freshly brewed lemongrass herbal tea.',
    afternoon: 'Authentic Goan Hindu buffet served on banana leaves inside the plantation, visit 400-year-old Mangueshi temple.',
    evening: 'Private sunset catamaran sailing on the Chapora river with chilled local beer and acoustic music.',
    foodTip: 'Cashew feni and spiced mackerel recheado.',
    dailySpendEst: '₹5,200 for two',
  },
  {
    day: 4,
    title: 'South Goa Serenity & Culinary Farewell',
    theme: 'Unspoiled Sands & Souvenirs',
    morning: 'Breakfast on Palolem crescent beach, kayak trip into butterfly island and dolphin watching bay.',
    afternoon: 'Cabo de Rama fort cliffside picnic with panoramic Arabian Sea views, shopping for organic spices and cashews.',
    evening: 'Candlelight beach dinner on Agonda sand with live bossa nova music and ocean breeze.',
    foodTip: 'Bebinca layered dessert served with coconut ice cream.',
    dailySpendEst: '₹4,200 for two',
  },
];

export const ItineraryPreview: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const currentPlan = SAMPLE_DAYS.find((d) => d.day === activeDay) || SAMPLE_DAYS[0];

  return (
    <section id="sample" className="scroll-mt-20 py-16 lg:py-24 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              Output Showcase
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mt-1">
              Sample n8n Generated Itinerary
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Preview what an automated travel dossier looks like. Every submission is uniquely balanced according to your duration, party size, and budget.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            <span>Example: 4-Day Coastal Goa Escape</span>
          </div>
        </div>

        {/* Tab Controls (Functional interactive segmented control) */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl max-w-md mb-8">
          {SAMPLE_DAYS.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => setActiveDay(d.day)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeDay === d.day
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>

        {/* Active Day Detail Display */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-sm">
          
          {/* Day Title & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-rose-400 font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Day {currentPlan.day} Focus: {currentPlan.theme}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                {currentPlan.title}
              </h3>
            </div>

            <div className="text-xs text-slate-300 bg-slate-800/70 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-auto">
              <span className="text-slate-400">Daily Allocation: </span>
              <strong className="text-emerald-400 tabular-nums">{currentPlan.dailySpendEst}</strong>
            </div>
          </div>

          {/* Time Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            
            {/* Morning */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Sun className="h-4 w-4" />
                <span>Morning Routine (08:30 - 12:00)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentPlan.morning}
              </p>
            </div>

            {/* Afternoon */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                <Compass className="h-4 w-4" />
                <span>Afternoon Discovery (13:00 - 17:30)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentPlan.afternoon}
              </p>
            </div>

            {/* Evening */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <Sunset className="h-4 w-4" />
                <span>Evening Dining & Culture (18:30+)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentPlan.evening}
              </p>
            </div>

          </div>

          {/* Local Culinary Insider Recommendation */}
          <div className="mt-6 rounded-xl border border-amber-900/30 bg-amber-950/10 p-4 flex items-start gap-3">
            <Utensils className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-amber-300">Curator Gastronomy Note: </span>
              {currentPlan.foodTip}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
