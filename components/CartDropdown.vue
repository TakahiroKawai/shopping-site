<script setup>
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'
import LogoutButton from '~/components/LogoutButton.vue'

const cart = useCartStore()
const user = useUserStore()
const router = useRouter()

const goToLogin = () => router.push('/login')
const goToCheckout = () => router.push('/checkout')
const clearCart = () => cart.clearCart()

const onLogout = () => {
  user.logout()
  cart.clearCart()
  alert('ログアウトしました')
}
</script>

<template>
  <div class="p-4">
    <h3 class="font-bold text-lg mb-2">カート内容</h3>

    <ul v-if="cart.items.length > 0" class="text-sm mb-2">
      <li v-for="(item, index) in cart.items" :key="index" class="mb-1">
        {{ item.name }} - {{ item.price.toLocaleString() }}円
      </li>
    </ul>
    <p v-else class="text-gray-500 text-sm mb-2">カートに商品はありません</p>

    <p class="text-right font-bold text-blue-600 mb-2">
      合計: {{ cart.totalPrice.toLocaleString() }}円
    </p>

    <button @click="clearCart" class="w-full bg-red-500 text-white py-1 rounded">
      カートを空にする
    </button>

    <div v-if="user.isLoggedIn" class="flex flex-col gap-2">
      <button @click="goToCheckout" :disabled="cart.items.length === 0" class="w-full py-2 rounded text-white  bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
        決済に進む
      </button>
      <div>
        <LogoutButton @logout="onLogout" />
      </div>
    </div>

    <div v-else>
      <button @click="goToLogin" class="w-full bg-blue-500 text-white py-1 rounded">
        ログイン
      </button>
    </div>
  </div>
</template>
