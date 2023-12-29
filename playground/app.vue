<template>
  <div class="home">
    <h3>Nuxt module playground!</h3>

    <div class="form">
      <div class="form-item">
        <span class="form-item__label">User name:</span>
        <input v-model="form.username" type="text" />
      </div>

      <div class="form-item">
        <span class="form-item__label">Password:</span>
        <input v-model="form.password" type="password" />
      </div>

      <div class="form-item">
        <span class="form-item__label"></span>
        <button @click="handleLogin">Login test</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from '#imports'

const form = reactive({
  username: '',
  password: '',
})

const handleLogin = async () => {
  const res = await $fetch('/user/login', {
    baseURL: '/api2',
    method: 'POST',
    body: form,
  })

  console.log(res)
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.form-item {
  margin-bottom: 12px;
}

.form-item__label {
  display: inline-block;
  min-width: 100px;
  text-align: right;
  margin-right: 14px;
}
</style>
