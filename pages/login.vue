<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">ログイン</h1>
    <LoginForm @login="handleLogin" />
    <p class="mt-4 text-gray-500 text-sm">
      テスト用ログイン：test@example.com / password
    </p>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '~/components/LoginForm.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const user = useUserStore()

const handleLogin = ({ email, password }: { email: string; password: string }) => {
  if (email === 'test@example.com' && password === 'password') {
    user.login(email)
    router.push('/')
  } else {
    alert('メールアドレスまたはパスワードが違います')
  }
}
</script>
