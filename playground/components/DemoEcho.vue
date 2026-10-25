<template>
  <ProxyPanel
    title="Echo / Header Inspection"
    :methods="['GET', 'POST']"
    :highlight="true"
    hint="Proxied: <code>/api/echo/**</code> → <code>httpbin.org/anything</code>
          &nbsp;·&nbsp; Demonstrates <strong>configureProxyRequest</strong> with custom headers:
          <code>X-Proxy-Auth</code>, <code>X-Request-Source</code>, <code>X-Proxy-Version</code>"
  >
    <template #actions>
      <button
        class="btn btn--primary"
        :disabled="loading.echoGet"
        @click="echoGet"
      >
        {{ loading.echoGet ? 'Loading...' : 'GET /api/echo' }}
      </button>
      <button
        class="btn btn--post"
        :disabled="loading.echoPost"
        @click="echoPost"
      >
        {{ loading.echoPost ? 'Sending...' : 'POST /api/echo' }}
      </button>
    </template>

    <div
      v-if="results.echoError"
      class="result result--error"
    >
      <span class="result__icon">❌</span> {{ results.echoError }}
    </div>
    <div
      v-else-if="results.echo"
      class="result"
    >
      <div class="result__meta">
        <span class="badge badge--success">Proxied Successfully</span>
        <span class="badge badge--info">Headers injected by configureProxyRequest</span>
      </div>
      <div
        v-if="results.echo.headers"
        class="echo-headers"
      >
        <h4>🔍 Custom Headers Received by httpbin:</h4>
        <div class="header-tags">
          <span
            v-for="(val, key) in getCustomHeaders(results.echo.headers)"
            :key="key"
            class="header-tag"
          >
            <strong>{{ key }}</strong>: {{ val }}
          </span>
        </div>
      </div>
      <details class="result__details">
        <summary>Full response from httpbin</summary>
        <pre class="result__json">{{ formatJson(results.echo) }}</pre>
      </details>
    </div>
    <div
      v-else
      class="result result--empty"
    >
      <span class="result__icon">👆</span> Click a button above to test header injection via configureProxyRequest
    </div>
  </ProxyPanel>
</template>

<script setup lang="ts">
import { useProxyDemo } from '../composables/useProxyDemo'

const { loading, results, formatJson, getCustomHeaders, echoGet, echoPost } = useProxyDemo()
</script>

<style scoped>
.echo-headers {
  margin-bottom: 16px;
}

.echo-headers h4 {
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.header-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.header-tag {
  background: #eef2ff;
  color: #3730a3;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-family: 'SF Mono', 'Fira Code', Menlo, monospace;
}

.header-tag strong {
  color: #4338ca;
}
</style>
