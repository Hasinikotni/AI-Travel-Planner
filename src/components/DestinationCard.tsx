import React from 'react';
import { ArrowUpRight, Clock, IndianRupee } from 'lucide-react';
import { CuratedDestination } from '../types/travel';

interface DestinationSectionProps {
  onSelectDestination: (dest: CuratedDestination) => void;
}

const FEATURED_DESTINATIONS: CuratedDestination[] = [
  {
    id: 'dest-goa',
    title: 'Goa Coastal Escape',
    subtitle: 'Golden sands, Portuguese heritage, spice farms, and coastal twilight cafes',
    image: '/src/assets/images/dest_goa_beach_1790760960316.jpg',
    recommendedDays: 4,
    estimatedBudget: 35000,
    startingFrom: 'Mumbai or Bengaluru',
    tags: ['Coastal', 'Relaxation', 'Culinary'],
    description: 'Perfect short escape with beachfront stays, water sports at Palolem, fontainhas Latin quarter walks, and scenic scooter trails through spice plantations.',
  },
  {
    id: 'dest-kyoto',
    title: 'Historic Kyoto & Arashiyama',
    subtitle: 'Bamboo groves, ancient zen shrines, tea ceremonies, and culinary alleys',
    image: '/src/assets/images/dest_kyoto_pagoda_1790760977940.jpg',
    recommendedDays: 7,
    estimatedBudget: 125000,
    startingFrom: 'Delhi or Mumbai',
    tags: ['Culture', 'Temples', 'Tradition'],
    description: 'An immersive cultural expedition through Gion geisha districts, Fushimi Inari torii gates, Michelin-starred matcha cafes, and tranquil Ryokan onsen retreats.',
  },
  {
    id: 'dest-swiss',
    title: 'Swiss Alps Panorama',
    subtitle: 'Iconic glacier peaks, wildflower valleys, scenic cogwheel trains, and chalets',
    image: '/src/assets/images/dest_swiss_alps_1790760994869.jpg',
    recommendedDays: 8,
    estimatedBudget: 240000,
    startingFrom: 'Any International Hub',
    tags: ['Alpine', 'Scenic Trains', 'Adventure'],
    description: 'High-altitude adventure covering Zermatt, Jungfraujoch, Lake Lucerne cruises, fondue tastings, and panoramic Glacier Express journeys.',
  },
];

export const DestinationSection: React.FC<DestinationSectionProps> = ({
  onSelectDestination,
}) => {
  return (
    <section id="destinations" className="scroll-mt-20 py-16 lg:py-24 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              Curated Inspirations
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mt-1">
              Popular Travel Blueprints
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Select any featured destination to pre-populate your requirements and receive a comprehensive automated travel dossier.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            <span>Direct 1-click pre-fill enabled</span>
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col hover:border-slate-700 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image Container with Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                {/* Overlay Title */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-bold text-white font-display">
                    {dest.title}
                  </h3>
                  {/* Zero-pill metadata text with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                    <span>{dest.recommendedDays} Days</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">Est. ₹{dest.estimatedBudget.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {dest.description}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <span>Suggested departure: </span>
                    <strong className="text-slate-200">{dest.startingFrom}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectDestination(dest)}
                    className="flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Use Blueprint</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
