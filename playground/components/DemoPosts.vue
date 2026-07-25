<template>
  <ProxyPanel
    title="Posts API"
    :methods="['GET']"
    hint="Proxied: <code>/api/posts/**</code> → <code>jsonplaceholder.typicode.com/posts/**</code>
          &nbsp;·&nbsp; Demonstrates <strong>multiple proxy targets</strong>"
  >
    <template #actions>
      <button class="btn btn--primary" :disabled="loading.posts" @click="fetchPosts">
        {{ loading.posts ? 'Loading...' : 'GET /api/posts' }}
      </button>
      <button class="btn btn--accent" :disabled="loading.singlePost" @click="fetchSinglePost">
        {{ loading.singlePost ? 'Loading...' : 'GET /api/posts/1' }}
      </button>
      <button class="btn btn--accent" :disabled="loading.postComments" @click="fetchPostComments">
        {{ loading.postComments ? 'Loading...' : 'GET /api/posts/1/comments' }}
      </button>
    </template>

    <div v-if="results.postsError" class="result result--error">
      <span class="result__icon">❌</span> {{ results.postsError }}
    </div>
    <div v-else-if="results.posts" class="result">
      <div class="result__meta">
        <span class="badge badge--success">Proxied Successfully</span>
        <span v-if="Array.isArray(results.posts)" class="result__count">{{ results.posts.length }} items</span>
      </div>
      <pre class="result__json">{{ formatJson(results.posts) }}</pre>
    </div>
    <div v-else class="result result--empty">
      <span class="result__icon">👆</span> Click a button above to test the Posts proxy rule
    </div>
  </ProxyPanel>
</template>

<script setup lang="ts">
import { useProxyDemo } from '../composables/useProxyDemo'

const { loading, results, formatJson, fetchPosts, fetchSinglePost, fetchPostComments } = useProxyDemo()
</script>
