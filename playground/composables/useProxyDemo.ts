import { reactive } from 'vue'

// ── Shared proxy demo state (lazy singleton) ──────────────────
// State is initialized lazily inside useProxyDemo() to avoid
// module-level reactive() calls breaking SSR.

let _state: ReturnType<typeof createState> | null = null

function createState() {
  const loading = reactive({
    users: false,
    singleUser: false,
    createUser: false,
    posts: false,
    singlePost: false,
    postComments: false,
    echoGet: false,
    echoPost: false,
    publicGet: false,
    publicPost: false,
  })

  const results = reactive<{
    users: any
    usersError: string | null
    posts: any
    postsError: string | null
    echo: any
    echoError: string | null
    public: any
    publicError: string | null
  }>({
    users: null,
    usersError: null,
    posts: null,
    postsError: null,
    echo: null,
    echoError: null,
    public: null,
    publicError: null,
  })

  // ── Helpers ──────────────────────────────────────────────────
  function formatJson(data: any): string {
    try {
      if (Array.isArray(data) && data.length > 8) {
        return JSON.stringify(data.slice(0, 8), null, 2)
          + '\n// ... ' + (data.length - 8) + ' more items'
      }
      return JSON.stringify(data, null, 2)
    }
    catch {
      return String(data)
    }
  }

  function getCustomHeaders(headers: Record<string, string>) {
    const custom: Record<string, string> = {}
    for (const [k, v] of Object.entries(headers)) {
      if (k.toLowerCase().startsWith('x-')) {
        custom[k] = v
      }
    }
    return custom
  }

  // ── Users API ────────────────────────────────────────────────
  async function fetchUsers() {
    loading.users = true
    results.users = null
    results.usersError = null
    try {
      results.users = await $fetch('/api/users')
    }
    catch (e: any) { results.usersError = e.message || 'Failed to fetch users' }
    finally { loading.users = false }
  }

  async function fetchSingleUser() {
    loading.singleUser = true
    results.users = null
    results.usersError = null
    try {
      results.users = await $fetch('/api/users/1')
    }
    catch (e: any) { results.usersError = e.message || 'Failed to fetch user' }
    finally { loading.singleUser = false }
  }

  async function createUser() {
    loading.createUser = true
    results.users = null
    results.usersError = null
    try {
      results.users = await $fetch('/api/users', {
        method: 'POST',
        body: { name: 'Nuxt Proxy Demo', username: 'nuxtproxy', email: 'demo@nuxt-proxy.local' },
      })
    }
    catch (e: any) { results.usersError = e.message || 'Failed to create user' }
    finally { loading.createUser = false }
  }

  // ── Posts API ────────────────────────────────────────────────
  async function fetchPosts() {
    loading.posts = true
    results.posts = null
    results.postsError = null
    try {
      results.posts = await $fetch('/api/posts')
    }
    catch (e: any) { results.postsError = e.message || 'Failed to fetch posts' }
    finally { loading.posts = false }
  }

  async function fetchSinglePost() {
    loading.singlePost = true
    results.posts = null
    results.postsError = null
    try {
      results.posts = await $fetch('/api/posts/1')
    }
    catch (e: any) { results.postsError = e.message || 'Failed to fetch post' }
    finally { loading.singlePost = false }
  }

  async function fetchPostComments() {
    loading.postComments = true
    results.posts = null
    results.postsError = null
    try {
      results.posts = await $fetch('/api/posts/1/comments')
    }
    catch (e: any) { results.postsError = e.message || 'Failed to fetch comments' }
    finally { loading.postComments = false }
  }

  // ── Echo / Header Inspection ─────────────────────────────────
  async function echoGet() {
    loading.echoGet = true
    results.echo = null
    results.echoError = null
    try {
      results.echo = await $fetch('/api/echo')
    }
    catch (e: any) { results.echoError = e.message || 'Echo request failed' }
    finally { loading.echoGet = false }
  }

  async function echoPost() {
    loading.echoPost = true
    results.echo = null
    results.echoError = null
    try {
      results.echo = await $fetch('/api/echo', {
        method: 'POST',
        body: { message: 'Hello from nuxt-proxy-request demo!', timestamp: new Date().toISOString() },
      })
    }
    catch (e: any) { results.echoError = e.message || 'Echo POST failed' }
    finally { loading.echoPost = false }
  }

  // ── Function-Based Path Filter ───────────────────────────────
  async function fetchFiltered() {
    loading.publicGet = true
    results.public = null
    results.publicError = null
    try {
      results.public = await $fetch('/api/filter/test')
    }
    catch (e: any) { results.publicError = e.message || 'Request failed' }
    finally { loading.publicGet = false }
  }

  async function postFiltered() {
    loading.publicPost = true
    results.public = null
    results.publicError = null
    try {
      results.public = await $fetch('/api/filter/test', { method: 'POST', body: { test: true } })
    }
    catch (e: any) {
      results.publicError = e.message || 'Request blocked (as expected — function filter only allows GET)'
    }
    finally { loading.publicPost = false }
  }

  return {
    loading,
    results,
    formatJson,
    getCustomHeaders,
    fetchUsers,
    fetchSingleUser,
    createUser,
    fetchPosts,
    fetchSinglePost,
    fetchPostComments,
    echoGet,
    echoPost,
    fetchFiltered,
    postFiltered,
  }
}

export function useProxyDemo() {
  if (!_state) _state = createState()
  return _state
}
