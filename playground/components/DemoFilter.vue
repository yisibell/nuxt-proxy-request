<template>
  <ProxyPanel
    title="Function-Based Path Filter"
    :methods="['GET']"
    hint="Proxied: <code>/api/filter/**</code> → <code>httpbin.org/anything</code>
          &nbsp;·&nbsp; Demonstrates <strong>function-based pathFilter</strong> —
          only proxies GET requests matching <code>/api/filter/.*</code>"
  >
    <template #actions>
      <button
        class="btn btn--primary"
        :disabled="loading.publicGet"
        @click="fetchFiltered"
      >
        {{ loading.publicGet ? 'Loading...' : 'GET /api/filter/test' }}
      </button>
      <button
        class="btn btn--outline"
        :disabled="loading.publicPost"
        @click="postFiltered"
      >
        {{ loading.publicPost ? 'Sending...' : 'POST /api/filter/test (blocked)' }}
      </button>
    </template>

    <div
      v-if="results.publicError"
      class="result result--warn"
    >
      <span class="result__icon">ℹ️</span> {{ results.publicError }}
      <p class="result__explain">
        This is expected — the function-based <code>pathFilter</code> only allows GET requests,
        so POST to <code>/api/filter/test</code> bypasses the proxy and hits Nuxt's 404.
      </p>
    </div>
    <div
      v-else-if="results.public"
      class="result"
    >
      <div class="result__meta">
        <span class="badge badge--success">Proxied via function-based pathFilter</span>
      </div>
      <pre class="result__json">{{ formatJson(results.public) }}</pre>
    </div>
    <div
      v-else
      class="result result--empty"
    >
      <span class="result__icon">👆</span> Try both buttons — observe that POST is blocked by the function filter
    </div>
  </ProxyPanel>
</template>

<script setup lang="ts">
import { useProxyDemo } from '../composables/useProxyDemo'

const { loading, results, formatJson, fetchFiltered, postFiltered } = useProxyDemo()
</script>
