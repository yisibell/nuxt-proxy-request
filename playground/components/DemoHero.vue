<template>
  <header class="hero">
    <div class="hero__badge">
      Nuxt Module
    </div>
    <h1 class="hero__title">
      <span class="hero__icon">⚡</span>
      nuxt-proxy-request
    </h1>
    <p class="hero__subtitle">
      HTTP Proxy for Nuxt — powered by
      <a href="https://github.com/yisibell/h3-proxy" target="_blank" class="link">h3-proxy</a>
    </p>
    <p class="hero__desc">
      Seamlessly proxy API requests in both
      <strong>development</strong> and <strong>production</strong> environments.
      No more <code>http-proxy-middleware</code> compatibility issues.
    </p>
    <div class="hero__links">
      <a href="https://www.npmjs.com/package/nuxt-proxy-request" target="_blank" class="btn btn--outline">
        📦 npm
      </a>
      <a href="https://github.com/yisibell/nuxt-proxy-request" target="_blank" class="btn btn--outline">
        ⭐ GitHub
      </a>
    </div>
  </header>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 56px 24px 48px;
}

.hero__badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--c-primary);
  background: linear-gradient(135deg, #eef2ff, #ede9fe);
  margin-bottom: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.hero__title {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--c-gradient-start), var(--c-gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__icon {
  -webkit-text-fill-color: initial;
}

.hero__subtitle {
  font-size: 1.15rem;
  color: var(--c-text-muted);
  margin-bottom: 12px;
}

.hero__desc {
  font-size: 0.95rem;
  color: var(--c-text-muted);
  max-width: 560px;
  margin: 0 auto 24px;
}

.hero__links {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>
