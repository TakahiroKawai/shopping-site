<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <input
      v-model="email"
      type="email"
      required
      placeholder="メールアドレス"
      class="border px-3 py-2 w-full rounded"
    />
    <input
      v-model="password"
      type="password"
      required
      placeholder="パスワード"
      class="border px-3 py-2 w-full rounded"
    />
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">
      ログイン
    </button>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'login', credentials: { email: string; password: string }): void
}>()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  emit('login', { email: email.value, password: password.value })
}
</script>
