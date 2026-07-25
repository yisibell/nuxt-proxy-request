<template>
  <footer class="footer">
    <p>
      Built with <a href="https://nuxt.com" target="_blank" class="link">Nuxt</a>
      and <a href="https://github.com/yisibell/h3-proxy" target="_blank" class="link">h3-proxy</a>
      · Works in dev (<code>nuxi dev</code>) and production (<code>nuxi build</code>)
      · <a href="https://github.com/yisibell/nuxt-proxy-request" target="_blank" class="link">Source</a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 32px 0;
  font-size: 0.8rem;
  color: var(--c-text-muted);
  border-top: 1px solid var(--c-border);
  margin-top: 24px;
}
</style>
