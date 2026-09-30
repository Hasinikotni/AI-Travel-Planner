import React, { useState } from 'react';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Mail,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { TripFormData, SubmissionRecord } from '../types/travel';

interface TripPlannerFormProps {
  n8nUrl: string;
  onSuccessfulSubmission: (record: SubmissionRecord) => void;
  externalPrefill?: Partial<TripFormData> | null;
}

const DEPARTURE_SUGGESTIONS = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'London',
  'New York',
];

const DESTINATION_SUGGESTIONS = [
  'Goa',
  'Kyoto',
  'Swiss Alps',
  'Manali',
  'Kerala Backwaters',
  'Bali',
  'Jaipur, Rajasthan',
  'Amalfi Coast',
];

const TRAVEL_VIBES = [
  'Cultural & Heritage',
  'Relaxed & Leisure',
  'Adventure & Outdoor',
  'Culinary & Nightlife',
  'Scenic Nature',
  'Luxury & Wellness',
];

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  n8nUrl,
  onSuccessfulSubmission,
  externalPrefill,
}) => {
  const [formData, setFormData] = useState<TripFormData>({
    startingLocation: externalPrefill?.startingLocation || '',
    destination: externalPrefill?.destination || '',
    numberOfDays: externalPrefill?.numberOfDays || 5,
    numberOfTravelers: externalPrefill?.numberOfTravelers || 2,
    budget: externalPrefill?.budget || 45000,
    email: externalPrefill?.email || '',
    travelStyle: 'Relaxed & Leisure',
    preferences: '',
  });

  // Keep synced if externalPrefill changes
  React.useEffect(() => {
    if (externalPrefill) {
      setFormData((prev) => ({
        ...prev,
        ...externalPrefill,
      }));
    }
  }, [externalPrefill]);

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);

  const handleInputChange = (
    field: keyof TripFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (statusMessage) {
      setStatusMessage(null);
      setIsError(false);
    }
  };

  const loadSample = () => {
    setFormData({
      startingLocation: 'Mumbai',
      destination: 'Goa',
      numberOfDays: 4,
      numberOfTravelers: 2,
      budget: 35000,
      email: 'traveler@example.com',
      travelStyle: 'Relaxed & Leisure',
      preferences: 'Beachfront cafes, sunset sailing, authentic Goan seafood, and scooter day trips.',
    });
    setStatusMessage(null);
    setSubmittedResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    setIsError(false);

    // Validation
    if (
      !formData.startingLocation.trim() ||
      !formData.destination.trim() ||
      !formData.numberOfDays ||
      !formData.numberOfTravelers ||
      !formData.budget ||
      !formData.email.trim()
    ) {
      setIsLoading(false);
      setIsError(true);
      setStatusMessage('Please fill in all required fields marked with *');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setIsLoading(false);
      setIsError(true);
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startingLocation: formData.startingLocation.trim(),
          destination: formData.destination.trim(),
          numberOfDays: Number(formData.numberOfDays),
          numberOfTravelers: Number(formData.numberOfTravelers),
          budget: Number(formData.budget),
          email: formData.email.trim(),
          n8nUrl: n8nUrl,
          preferences: `${formData.travelStyle ? `Vibe: ${formData.travelStyle}. ` : ''}${formData.preferences || ''}`,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const record: SubmissionRecord = {
          id: 'sub-' + Date.now(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          startingLocation: formData.startingLocation,
          destination: formData.destination,
          numberOfDays: Number(formData.numberOfDays),
          numberOfTravelers: Number(formData.numberOfTravelers),
          budget: Number(formData.budget),
          email: formData.email,
          status: 'delivered',
          n8nStatus: data.n8nStatus || 200,
        };
        onSuccessfulSubmission(record);
        setSubmittedResult({
          record,
          message: data.message || 'Requirements submitted successfully to n8n!',
        });
      } else {
        setIsError(true);
        setStatusMessage(
          data.error || 'Failed to submit form to n8n. Please check the workflow status.'
        );
      }
    } catch (err: any) {
      setIsError(true);
      setStatusMessage(
        err?.message || 'Network error communicating with the server.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const perPersonBudget =
    formData.budget && formData.numberOfTravelers
      ? Math.round(Number(formData.budget) / Number(formData.numberOfTravelers))
      : 0;

  const perDayBudget =
    formData.budget && formData.numberOfDays
      ? Math.round(Number(formData.budget) / Number(formData.numberOfDays))
      : 0;

  return (
    <section id="planner" className="scroll-mt-20 py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Form Container */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8 md:p-10 backdrop-blur-sm">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                <span>Personalized Itinerary Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Travel Requirements
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Submits directly to your n8n workflow endpoint to synthesize your custom itinerary.
              </p>
            </div>

            <button
              type="button"
              onClick={loadSample}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-md transition-colors self-start sm:self-auto"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Fill Sample Data</span>
            </button>
          </div>

          {/* Submission Success Screen */}
          {submittedResult ? (
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-display">
                  Itinerary Request Dispatched!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your travel parameters have been accepted by the n8n Cloud workflow. The automated agent is compiling your personalized itinerary for{' '}
                  <strong className="text-white">{submittedResult.record.destination}</strong>.
                </p>
              </div>

              {/* Submitted Details Box */}
              <div className="mx-auto max-w-lg rounded-xl border border-slate-800 bg-slate-950/60 p-5 text-left text-xs space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Destination</span>
                  <span className="font-semibold text-white">{submittedResult.record.destination}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Departure Location</span>
                  <span className="text-slate-200">{submittedResult.record.startingLocation}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Duration & Party</span>
                  <span className="text-slate-200">
                    {submittedResult.record.numberOfDays} Days · {submittedResult.record.numberOfTravelers} Travelers
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Allocated Budget</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">
                    ₹{submittedResult.record.budget.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Delivery Inbox</span>
                  <span className="text-rose-400 font-mono">{submittedResult.record.email}</span>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedResult(null);
                    setStatusMessage(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Plan Another Journey</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              
              {/* Row 1: Origins & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Field-0: Starting Location */}
                <div>
                  <label
                    htmlFor="field-0"
                    className="block text-xs font-medium text-slate-300 mb-2"
                  >
                    Starting Location <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <input
                      id="field-0"
                      name="field-0"
                      type="text"
                      required
                      value={formData.startingLocation}
                      onChange={(e) => handleInputChange('startingLocation', e.target.value)}
                      placeholder="e.g., Mumbai, Delhi, New York"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/70 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  {/* Quick Suggestions */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[11px] text-slate-500">Suggestions:</span>
                    {DEPARTURE_SUGGESTIONS.slice(0, 4).map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => handleInputChange('startingLocation', city)}
                        className="text-[11px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field-1: Destination */}
                <div>
                  <label
                    htmlFor="field-1"
                    className="block text-xs font-medium text-slate-300 mb-2"
                  >
                    Destination <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <MapPin className="h-4 w-4 text-rose-400" />
                    </div>
                    <input
                      id="field-1"
                      name="field-1"
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      placeholder="e.g., Goa, Kyoto, Swiss Alps"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/70 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  {/* Quick Suggestions */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[11px] text-slate-500">Popular:</span>
                    {DESTINATION_SUGGESTIONS.slice(0, 4).map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => handleInputChange('destination', dest)}
                        className="text-[11px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Row 2: Duration, Travelers & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Field-2: Number of Days */}
                <div>
                  <label
                    htmlFor="field-2"
                    className="block text-xs font-medium text-slate-300 mb-2"
                  >
                    Number of Days <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <input
                      id="field-2"
                      name="field-2"
                      type="number"
                      min="1"
                      max="60"
                      required
                      value={formData.numberOfDays}
                      onChange={(e) => handleInputChange('numberOfDays', e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/70 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 tabular-nums"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[3, 5, 7, 10].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => handleInputChange('numberOfDays', days)}
                        className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                          Number(formData.numberOfDays) === days
                            ? 'bg-rose-600/30 text-rose-300 border border-rose-500/40'
                            : 'bg-slate-800/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        {days}d
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field-3: Number of Travelers */}
                <div>
                  <label
                    htmlFor="field-3"
                    className="block text-xs font-medium text-slate-300 mb-2"
                  >
                    Number of Travelers <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Users className="h-4 w-4" />
                    </div>
                    <input
                      id="field-3"
                      name="field-3"
                      type="number"
                      min="1"
                      max="30"
                      required
                      value={formData.numberOfTravelers}
                      onChange={(e) => handleInputChange('numberOfTravelers', e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/70 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 tabular-nums"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    {[
                      { label: 'Solo', val: 1 },
                      { label: 'Couple', val: 2 },
                      { label: 'Group 4', val: 4 },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleInputChange('numberOfTravelers', item.val)}
                        className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                          Number(formData.numberOfTravelers) === item.val
                            ? 'bg-rose-600/30 text-rose-300 border border-rose-500/40'
                            : 'bg-slate-800/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field-4: Budget (₹) */}
                <div>
                  <label
                    htmlFor="field-4"
                    className="block text-xs font-medium text-slate-300 mb-2"
                  >
                    Budget (₹) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <IndianRupee className="h-4 w-4 text-emerald-400" />
                    </div>
                    <input
                      id="field-4"
                      name="field-4"
                      type="number"
                      min="1000"
                      step="1000"
                      required
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      placeholder="e.g., 35000"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/70 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 tabular-nums"
                    />
                  </div>
                  {/* Budget Breakdown Indicator */}
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>
                      ≈ ₹{perPersonBudget.toLocaleString()} / person
                    </span>
                    <span>
                      ≈ ₹{perDayBudget.toLocaleString()} / day
                    </span>
                  </div>
                </div>

              </div>

              {/* Row 3: Traveler Email & Travel Vibe */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Field-5: Email */}
                <div>
                  <label
                    htmlFor="field-5"
                    className="block text-xs font-medium text-slate-300 mb-2"
                  >
                    Delivery Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="field-5"
                      name="field-5"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/70 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Your complete day-by-day travel plan and booking suggestions will be delivered here.
                  </p>
                </div>

                {/* Travel Vibe Selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Travel Vibe & Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TRAVEL_VIBES.slice(0, 4).map((vibe) => {
                      const isSelected = formData.travelStyle === vibe;
                      return (
                        <button
                          key={vibe}
                          type="button"
                          onClick={() => handleInputChange('travelStyle', vibe)}
                          className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg border transition-colors text-left ${
                            isSelected
                              ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                              : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                          }`}
                        >
                          <span className="truncate">{vibe}</span>
                          {isSelected && <Check className="h-3 w-3 text-rose-400 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Optional Preferences & Custom Notes */}
              <div>
                <label
                  htmlFor="field-notes"
                  className="block text-xs font-medium text-slate-300 mb-2"
                >
                  Special Preferences or Must-See Requests (Optional)
                </label>
                <textarea
                  id="field-notes"
                  rows={2}
                  value={formData.preferences}
                  onChange={(e) => handleInputChange('preferences', e.target.value)}
                  placeholder="e.g. Vegetarian food preferences, kid-friendly activities, direct flights preferred, interest in local art galleries..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Error or Notice Display */}
              {statusMessage && (
                <div
                  className={`p-3.5 rounded-lg text-xs flex items-start gap-2.5 ${
                    isError
                      ? 'bg-rose-950/40 border border-rose-800 text-rose-200'
                      : 'bg-emerald-950/40 border border-emerald-800 text-emerald-200'
                  }`}
                >
                  {isError ? (
                    <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span>Target: n8n Cloud Webhook Workflow</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg shadow-lg shadow-rose-950/30 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting to n8n...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Generate Personalized Plan</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
