<template>
  <section class="features">
    <div v-for="card in cards" :key="card.title" class="feature-card">
      <div class="feature-card__icon">
        {{ card.icon }}
      </div>
      <h3>{{ card.title }}</h3>
      <p v-html="card.desc" />
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    icon: '🎯',
    title: 'Multiple Targets',
    desc: 'Proxy to different backends — each with its own rules, rewrites, and headers.',
  },
  {
    icon: '✂️',
    title: 'Path Rewrite',
    desc: 'Strip or transform URL prefixes before forwarding requests upstream.',
  },
  {
    icon: '🔐',
    title: 'Header Injection',
    desc: 'Inject custom auth tokens or metadata via <code>configureProxyRequest</code>.',
  },
  {
    icon: '⚙️',
    title: 'Function Filters',
    desc: 'Advanced path matching with function-based <code>pathFilter</code> and method checks.',
  },
]
</script>

<style scoped>
.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}

.feature-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--rad);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.feature-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.feature-card__icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.feature-card h3 {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.feature-card p {
  font-size: 0.82rem;
  color: var(--c-text-muted);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
