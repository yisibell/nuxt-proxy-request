<template>
  <ProxyPanel
    title="Users API"
    :methods="['GET', 'POST']"
    hint="Proxied: <code>/api/users/**</code> → <code>jsonplaceholder.typicode.com/users/**</code>
          &nbsp;·&nbsp; Rule: pathRewrite <code>^/api → ''</code>"
  >
    <template #actions>
      <button
        class="btn btn--primary"
        :disabled="loading.users"
        @click="fetchUsers"
      >
        {{ loading.users ? 'Loading...' : 'GET /api/users' }}
      </button>
      <button
        class="btn btn--accent"
        :disabled="loading.singleUser"
        @click="fetchSingleUser"
      >
        {{ loading.singleUser ? 'Loading...' : 'GET /api/users/1' }}
      </button>
      <button
        class="btn btn--post"
        :disabled="loading.createUser"
        @click="createUser"
      >
        {{ loading.createUser ? 'Sending...' : 'POST /api/users' }}
      </button>
    </template>

    <div
      v-if="results.usersError"
      class="result result--error"
    >
      <span class="result__icon">❌</span> {{ results.usersError }}
    </div>
    <div
      v-else-if="results.users"
      class="result"
    >
      <div class="result__meta">
        <span class="badge badge--success">Proxied Successfully</span>
        <span
          v-if="Array.isArray(results.users)"
          class="result__count"
        >{{ results.users.length }} users loaded</span>
      </div>
      <pre class="result__json">{{ formatJson(results.users) }}</pre>
    </div>
    <div
      v-else
      class="result result--empty"
    >
      <span class="result__icon">👆</span> Click a button above to test the Users proxy rule
    </div>
  </ProxyPanel>
</template>

<script setup lang="ts">
import { useProxyDemo } from '../composables/useProxyDemo'

const { loading, results, formatJson, fetchUsers, fetchSingleUser, createUser } = useProxyDemo()
</script>
