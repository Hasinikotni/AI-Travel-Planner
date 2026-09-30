import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TripPlannerForm } from './components/TripPlannerForm';
import { DestinationSection } from './components/DestinationCard';
import { WorkflowSection } from './components/WorkflowSection';
import { ItineraryPreview } from './components/ItineraryPreview';
import { IntegrationDrawer } from './components/IntegrationDrawer';
import { Footer } from './components/Footer';
import { SubmissionRecord, CuratedDestination, TripFormData } from './types/travel';

const DEFAULT_N8N_URL = 'https://hasinigirl.app.n8n.cloud/form/cc03ab0d-65c6-4f47-bb8a-3f876bcd44f0';

export default function App() {
  const [n8nUrl, setN8nUrl] = useState<string>(() => {
    return localStorage.getItem('voyage_n8n_url') || DEFAULT_N8N_URL;
  });

  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('voyage_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isN8nOnline, setIsN8nOnline] = useState<boolean | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [externalPrefill, setExternalPrefill] = useState<Partial<TripFormData> | null>(null);

  // Check n8n connectivity on mount
  useEffect(() => {
    let isMounted = true;
    fetch(`/api/test-n8n?url=${encodeURIComponent(n8nUrl)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setIsN8nOnline(data.success === true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsN8nOnline(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [n8nUrl]);

  // Persist submissions
  useEffect(() => {
    try {
      localStorage.setItem('voyage_submissions', JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  const handleUpdateN8nUrl = (url: string) => {
    setN8nUrl(url);
    localStorage.setItem('voyage_n8n_url', url);
    // Re-check
    fetch(`/api/test-n8n?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => setIsN8nOnline(data.success === true))
      .catch(() => setIsN8nOnline(false));
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectQuickTrip = (
    origin: string,
    dest: string,
    days: number,
    travelers: number,
    budget: number
  ) => {
    setExternalPrefill({
      startingLocation: origin,
      destination: dest,
      numberOfDays: days,
      numberOfTravelers: travelers,
      budget: budget,
    });
    handleScrollToForm();
  };

  const handleSelectDestination = (dest: CuratedDestination) => {
    setExternalPrefill({
      destination: dest.title.split(' ')[0], // e.g. "Goa", "Kyoto", "Swiss"
      startingLocation: dest.startingFrom.includes('Mumbai') ? 'Mumbai' : 'Delhi',
      numberOfDays: dest.recommendedDays,
      numberOfTravelers: 2,
      budget: dest.estimatedBudget,
      travelStyle: dest.tags[0] || 'Relaxed & Leisure',
      preferences: `Interested in: ${dest.subtitle}`,
    });
    handleScrollToForm();
  };

  const handleSuccessfulSubmission = (record: SubmissionRecord) => {
    setSubmissions((prev) => [record, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Bar */}
      <Navbar
        onOpenIntegration={() => setIsDrawerOpen(true)}
        onScrollToForm={handleScrollToForm}
        isN8nOnline={isN8nOnline}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onStartPlanning={handleScrollToForm}
          onSelectQuickTrip={handleSelectQuickTrip}
        />

        <TripPlannerForm
          n8nUrl={n8nUrl}
          onSuccessfulSubmission={handleSuccessfulSubmission}
          externalPrefill={externalPrefill}
        />

        <DestinationSection onSelectDestination={handleSelectDestination} />

        <WorkflowSection
          n8nUrl={n8nUrl}
          onOpenIntegration={() => setIsDrawerOpen(true)}
        />

        <ItineraryPreview />
      </main>

      {/* Footer */}
      <Footer
        onOpenIntegration={() => setIsDrawerOpen(true)}
        onScrollToForm={handleScrollToForm}
      />

      {/* Diagnostics / Webhook Drawer */}
      <IntegrationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        n8nUrl={n8nUrl}
        onUpdateN8nUrl={handleUpdateN8nUrl}
        submissions={submissions}
      />
    </div>
  );
}
