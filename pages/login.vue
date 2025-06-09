<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'

const user = useUserStore()
const cart = useCartStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const doLogin = () => {
  if (email.value === 'user@test.co.jp' && password.value === 'pass') {
    user.login()
    cart.loadCart()
    router.push('/')
  } else {
    error.value = 'メールアドレスまたはパスワードが違います'
  }
}
</script>

<template>
  <form @submit.prevent="doLogin" class="p-4 max-w-md mx-auto">
      <div class="bg-gray-100 border rounded p-3 text-sm text-gray-700">
      <p class="font-semibold mb-1">テスト用ログイン情報</p>
      <ul class="list-disc pl-5">
        <li>メールアドレス: <code>user@test.co.jp</code></li>
        <li>パスワード: <code>pass</code></li>
      </ul>
    </div>

    <div>
      <label class="block font-semibold mb-1">メールアドレス</label>
      <input
        v-model="email"
        type="email"
        required
        class="w-full border px-3 py-2 rounded"
      />
    </div>

    <div>
      <label class="block font-semibold mb-1">パスワード</label>
      <input
        v-model="password"
        type="password"
        required
        class="w-full border px-3 py-2 rounded"
      />
    </div>
    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 rounded"
    >
      ログイン
    </button>
  </form>
</template>
