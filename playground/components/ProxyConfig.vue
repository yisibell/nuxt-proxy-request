<template>
  <ProxyPanel
    title="Active Proxy Configuration"
    :methods="[]"
    hint="Defined in <code>playground/nuxt.config.ts</code> via the <code>proxy</code> config key"
  >
    <div class="config-grid">
      <div v-for="(rule, i) in rules" :key="i" class="config-card">
        <div class="config-card__index">
          Rule {{ i + 1 }}
        </div>
        <table class="config-table">
          <tbody>
            <tr>
              <td class="config-table__key">Target</td>
              <td><code>{{ rule.target }}</code></td>
            </tr>
            <tr>
              <td class="config-table__key">pathFilter</td>
              <td><code>{{ rule.pathFilter }}</code></td>
            </tr>
            <tr>
              <td class="config-table__key">pathRewrite</td>
              <td><code>{{ rule.pathRewrite }}</code></td>
            </tr>
            <tr v-if="rule.configureProxyRequest">
              <td class="config-table__key">configureProxyRequest</td>
              <td><span class="badge badge--info">Active — injects custom headers</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ProxyPanel>
</template>

<script setup lang="ts">
const rules = [
  {
    target: 'https://jsonplaceholder.typicode.com',
    pathFilter: "['/api/users/**']",
    pathRewrite: "{ '^/api': '' }",
    configureProxyRequest: false,
  },
  {
    target: 'https://jsonplaceholder.typicode.com',
    pathFilter: "['/api/posts/**']",
    pathRewrite: "{ '^/api': '' }",
    configureProxyRequest: false,
  },
  {
    target: 'https://httpbin.org',
    pathFilter: "['/api/echo/**']",
    pathRewrite: "{ '^/api/echo': '/anything' }",
    configureProxyRequest: true,
  },
  {
    target: 'https://httpbin.org',
    pathFilter: 'function(path, req) { ... }',
    pathRewrite: "{ '^/api/filter': '/anything' }",
    configureProxyRequest: true,
  },
]
</script>

<style scoped>
.config-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.config-card {
  border: 1px solid var(--c-border);
  border-radius: var(--rad-sm);
  padding: 18px;
  background: #fafbfc;
}

.config-card__index {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--c-primary);
  margin-bottom: 10px;
}

.config-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.config-table td {
  padding: 5px 0;
  vertical-align: top;
}

.config-table__key {
  font-weight: 600;
  color: var(--c-text-muted);
  width: 170px;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
}
</style>
