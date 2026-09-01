"use client";

import { useState } from "react";
import { Lock, Eye, BarChart3, KeyRound, AlertCircle } from "lucide-react";

interface AnalyticsData {
  total: number;
  totalVisits: number;
  breakdown: { path: string; count: number }[];
}

export default function AnalyticsPage() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics?password=${encodeURIComponent(password)}`);
      if (res.status === 401) {
        setError("Incorrect password.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError("Analytics is not configured yet.");
        setLoading(false);
        return;
      }
      const json = (await res.json()) as AnalyticsData;
      setData(json);
      setUnlocked(true);
    } catch {
      setError("Could not load analytics.");
    } finally {
      setLoading(false);
    }
  };

  const maxCount = data?.breakdown.length
    ? Math.max(...data.breakdown.map((b) => b.count))
    : 0;

  return (
    <main className="min-h-screen bg-background px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10 text-coral">
            <BarChart3 className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">
              Analytics
            </h1>
            <p className="font-mono text-xs text-ink-muted">
              /analytics — private
            </p>
          </div>
        </div>

        {!unlocked && (
          <form
            onSubmit={unlock}
            className="rounded-card border border-white/[0.08] bg-surface p-8"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Lock className="h-3.5 w-3.5" />
              Protected
            </div>
            <label
              htmlFor="password"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-ink"
            >
              <KeyRound className="h-4 w-4 text-ink-muted" />
              Enter analytics password
            </label>
            <div className="flex gap-3">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-surface-2 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-coral/40"
                placeholder="••••••••"
              />
              <button
                type="submit"
                disabled={loading || !password}
                className="shrink-0 rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-background transition-opacity disabled:opacity-50"
              >
                {loading ? "Loading…" : "Unlock"}
              </button>
            </div>
            {error && (
              <p className="mt-4 flex items-center gap-2 text-sm text-coral">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </form>
        )}

        {unlocked && data && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-card border border-white/[0.08] bg-surface p-6">
                <div className="mb-2 flex items-center gap-2 text-sm text-ink-secondary">
                  <Eye className="h-4 w-4 text-accent" />
                  Total page views
                </div>
                <p className="text-4xl font-semibold tracking-tight text-ink">
                  {data.totalVisits.toLocaleString()}
                </p>
              </div>
              <div className="rounded-card border border-white/[0.08] bg-surface p-6">
                <div className="mb-2 flex items-center gap-2 text-sm text-ink-secondary">
                  <BarChart3 className="h-4 w-4 text-coral" />
                  Paths tracked
                </div>
                <p className="text-4xl font-semibold tracking-tight text-ink">
                  {data.breakdown.length}
                </p>
              </div>
            </div>

            <div className="rounded-card border border-white/[0.08] bg-surface p-6">
              <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
                Views by page
              </h2>
              {data.breakdown.length === 0 ? (
                <p className="text-sm text-ink-muted">No visits recorded yet.</p>
              ) : (
                <ul className="space-y-4">
                  {data.breakdown.map((b) => (
                    <li key={b.path}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-mono text-ink-secondary">{b.path}</span>
                        <span className="font-semibold text-ink">{b.count}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-coral"
                          style={{
                            width: `${maxCount ? Math.round((b.count / maxCount) * 100) : 0}%`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
