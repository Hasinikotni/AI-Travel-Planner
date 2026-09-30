import React, { useState } from 'react';
import {
  X,
  Activity,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  Server,
  Zap,
} from 'lucide-react';
import { SubmissionRecord } from '../types/travel';

interface IntegrationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  n8nUrl: string;
  onUpdateN8nUrl: (url: string) => void;
  submissions: SubmissionRecord[];
}

export const IntegrationDrawer: React.FC<IntegrationDrawerProps> = ({
  isOpen,
  onClose,
  n8nUrl,
  onUpdateN8nUrl,
  submissions,
}) => {
  const [testStatus, setTestStatus] = useState<{
    loading: boolean;
    success?: boolean;
    latencyMs?: number;
    statusCode?: number;
    error?: string;
  }>({ loading: false });

  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState(n8nUrl);
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  if (!isOpen) return null;

  const runTestPing = async () => {
    setTestStatus({ loading: true });
    try {
      const res = await fetch(`/api/test-n8n?url=${encodeURIComponent(customUrl)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setTestStatus({
          loading: false,
          success: true,
          latencyMs: data.latencyMs,
          statusCode: data.statusCode,
        });
      } else {
        setTestStatus({
          loading: false,
          success: false,
          error: data.error || `HTTP ${data.statusCode || res.status}`,
          statusCode: data.statusCode || res.status,
        });
      }
    } catch (err: any) {
      setTestStatus({
        loading: false,
        success: false,
        error: err?.message || 'Connection failure',
      });
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(customUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUrl = () => {
    onUpdateN8nUrl(customUrl.trim());
    setIsEditingUrl(false);
  };

  const handleResetUrl = () => {
    const defaultUrl = 'https://hasinigirl.app.n8n.cloud/form/cc03ab0d-65c6-4f47-bb8a-3f876bcd44f0';
    setCustomUrl(defaultUrl);
    onUpdateN8nUrl(defaultUrl);
    setIsEditingUrl(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg h-full bg-[#0d121d] border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-rose-500" />
              <h2 className="text-lg font-bold text-white font-display">
                n8n Cloud Webhook Diagnostics
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Connected Webhook URL */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-slate-300">
                Active n8n Form Endpoint
              </span>
              <button
                type="button"
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="text-rose-400 hover:text-rose-300 transition-colors"
              >
                {isEditingUrl ? 'Cancel' : 'Edit URL'}
              </button>
            </div>

            {isEditingUrl ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full text-xs font-mono rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none focus:border-rose-500"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveUrl}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-md"
                  >
                    Save Endpoint
                  </button>
                  <button
                    type="button"
                    onClick={handleResetUrl}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 font-mono break-all">
                <span className="flex-1 truncate">{n8nUrl}</span>
                <button
                  type="button"
                  onClick={copyUrl}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copy URL"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
                <a
                  href={n8nUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 text-slate-400 hover:text-white"
                  title="Open n8n form directly"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          {/* Test Connectivity Action */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                Endpoint Health Check
              </span>
              <button
                type="button"
                onClick={runTestPing}
                disabled={testStatus.loading}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
              >
                <RefreshCw className={`h-3 w-3 ${testStatus.loading ? 'animate-spin' : ''}`} />
                <span>Test Connection</span>
              </button>
            </div>

            {testStatus.loading && (
              <p className="text-xs text-slate-400">Pinging n8n cloud server...</p>
            )}

            {testStatus.success && (
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/80 text-emerald-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Connection Healthy (HTTP {testStatus.statusCode})</span>
                </div>
                <span className="tabular-nums font-mono">{testStatus.latencyMs}ms</span>
              </div>
            )}

            {testStatus.error && (
              <div className="flex items-start gap-2 text-xs p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/80 text-rose-300">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Check Failed: {testStatus.error}</span>
              </div>
            )}
          </div>

          {/* Field Mapping Specification */}
          <div className="mt-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Mapped n8n Form Payload
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-[11px] font-mono space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-rose-400">field-0</span>
                <span className="text-slate-400">Starting Location (string, required)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-400">field-1</span>
                <span className="text-slate-400">Destination (string, required)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-400">field-2</span>
                <span className="text-slate-400">Number of Days (number, required)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-400">field-3</span>
                <span className="text-slate-400">Number of Travelers (number, required)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-400">field-4</span>
                <span className="text-slate-400">Budget in ₹ (number, required)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-400">field-5</span>
                <span className="text-slate-400">Email Address (email, required)</span>
              </div>
            </div>
          </div>

          {/* Session Submissions Log */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-slate-300">
                Session Submissions ({submissions.length})
              </span>
            </div>

            {submissions.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 rounded-lg border border-slate-800/80 bg-slate-950/40">
                No trip submissions in this session yet. Submit your first plan!
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 text-xs space-y-1"
                  >
                    <div className="flex justify-between text-slate-200">
                      <strong>{sub.startingLocation} → {sub.destination}</strong>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Dispatched
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>{sub.numberOfDays}d · {sub.numberOfTravelers}p · ₹{sub.budget.toLocaleString()}</span>
                      <span>{sub.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500 text-center">
          VoyagePlan · Powered by n8n Cloud Automation
        </div>

      </div>
    </div>
  );
};
