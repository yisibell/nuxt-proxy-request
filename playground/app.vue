<template>
  <div>
    Nuxt module playground!

    <div>
      <span>User name:</span>
      <input v-model="form.username" type="text" />
    </div>

    <div>
      <span>Password:</span>
      <input v-model="form.password" type="password" />
    </div>

    <button @click="handleLogin">Login test</button>
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
