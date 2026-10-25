<template>
  <section
    class="panel"
    :class="{ 'panel--highlight': highlight }"
  >
    <div class="panel__header">
      <div>
        <h2 class="panel__title">
          <span
            v-for="m in methods"
            :key="m"
            class="method"
            :class="`method--${m.toLowerCase()}`"
          >{{ m }}</span>
          {{ title }}
        </h2>
        <p
          class="panel__hint"
          v-html="hint"
        />
      </div>
      <div
        v-if="$slots.actions"
        class="panel__actions"
      >
        <slot name="actions" />
      </div>
    </div>
    <div class="panel__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  methods: string[]
  hint: string
  highlight?: boolean
}>()
</script>

<style scoped>
.panel {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--rad);
  box-shadow: var(--shadow);
  margin-bottom: 24px;
  overflow: hidden;
}

.panel--highlight {
  border-color: #c7d2fe;
  box-shadow:
    0 0 0 3px rgba(99, 102, 241, 0.08),
    var(--shadow);
}

.panel__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--c-border);
  background: #fafbfc;
}

.panel__title {
  font-size: 1.05rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.panel__hint {
  font-size: 0.8rem;
  color: var(--c-text-muted);
  margin-top: 4px;
}

.panel__hint :deep(code) {
  font-size: 0.78rem;
}

.panel__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.panel__body {
  padding: 24px;
}

@media (max-width: 768px) {
  .panel__header {
    flex-direction: column;
  }

  .panel__actions {
    width: 100%;
  }

  .panel__actions :deep(.btn) {
    flex: 1;
    justify-content: center;
  }
}
</style>
