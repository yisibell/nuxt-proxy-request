<template>
  <div class="demo">
    <DemoHero />
    <FeatureCards />
    <DemoUsers />
    <DemoPosts />
    <DemoEcho />
    <DemoFilter />
    <ProxyConfig />
    <DemoFooter />
  </div>
</template>

<style>
/* ═══════════════════════════════════════════════════════════════════
   GLOBAL RESET & CSS VARIABLES
   ═══════════════════════════════════════════════════════════════════ */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --c-bg: #f8f9fc;
  --c-surface: #ffffff;
  --c-border: #e2e5ed;
  --c-text: #1a1d26;
  --c-text-muted: #6b7280;
  --c-primary: #6366f1;
  --c-primary-hover: #4f46e5;
  --c-accent: #0ea5e9;
  --c-accent-hover: #0284c7;
  --c-post: #f59e0b;
  --c-post-hover: #d97706;
  --c-success: #10b981;
  --c-error: #ef4444;
  --c-warn: #f59e0b;
  --c-info: #6366f1;
  --c-gradient-start: #6366f1;
  --c-gradient-end: #a855f7;
  --rad: 12px;
  --rad-sm: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
}

body {
  background: var(--c-bg);
  color: var(--c-text);
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

code {
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
  font-size: 0.85em;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  background: #f1f5f9;
  color: #1e293b;
}

pre {
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
  font-size: 0.8rem;
  line-height: 1.5;
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED UTILITY CLASSES
   ═══════════════════════════════════════════════════════════════════ */
.demo {
  max-width: 1040px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.link {
  color: var(--c-primary);
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

/* ── Buttons ───────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: var(--rad-sm);
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn--primary {
  background: var(--c-primary);
  color: #fff;
}

.btn--primary:hover:not(:disabled) {
  background: var(--c-primary-hover);
}

.btn--accent {
  background: var(--c-accent);
  color: #fff;
}

.btn--accent:hover:not(:disabled) {
  background: var(--c-accent-hover);
}

.btn--post {
  background: var(--c-post);
  color: #fff;
}

.btn--post:hover:not(:disabled) {
  background: var(--c-post-hover);
}

.btn--outline {
  background: var(--c-surface);
  color: var(--c-text);
  border: 1px solid var(--c-border);
}

.btn--outline:hover:not(:disabled) {
  background: var(--c-bg);
}

/* ── HTTP Method Badges ────────────────────────────────────────── */
.method {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  letter-spacing: 0.04em;
}

.method--get {
  background: #dcfce7;
  color: #15803d;
}

.method--post {
  background: #fef3c7;
  color: #b45309;
}

/* ── Badges ────────────────────────────────────────────────────── */
.badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}

.badge--success {
  background: #dcfce7;
  color: #15803d;
}

.badge--info {
  background: #eef2ff;
  color: #4338ca;
}

/* ── Results ───────────────────────────────────────────────────── */
.result {
  animation: fadeIn 0.25s ease;
}

.result__meta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.result__count {
  font-size: 0.8rem;
  color: var(--c-text-muted);
}

.result__json {
  background: #1e293b;
  color: #e2e8f0;
  padding: 18px 20px;
  border-radius: var(--rad-sm);
  overflow-x: auto;
  max-height: 460px;
  overflow-y: auto;
  font-size: 0.78rem;
  line-height: 1.65;
}

.result--empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--c-text-muted);
  font-size: 0.9rem;
}

.result--empty .result__icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 8px;
}

.result--error {
  padding: 16px 20px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--rad-sm);
  color: #991b1b;
  font-size: 0.875rem;
}

.result--warn {
  padding: 16px 20px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: var(--rad-sm);
  color: #92400e;
  font-size: 0.875rem;
}

.result__explain {
  margin-top: 8px;
  font-size: 0.8rem;
  color: #a16207;
}

.result__icon {
  margin-right: 6px;
}

.result__details {
  margin-top: 16px;
}

.result__details summary {
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-text-muted);
  padding: 6px 0;
}

.result__details .result__json {
  margin-top: 10px;
}

/* ── Respnsive ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .demo {
    padding: 20px 12px 60px;
  }
}

/* ── Animations ────────────────────────────────────────────────── */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
