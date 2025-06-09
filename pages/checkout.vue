<script setup>
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const confirmCheckout = () => {
  alert('決済が確定しました！（仮）\nありがとうございました。')
  cart.clearCart()
  router.push('/')
}
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">決済確認</h1>
    <p>お支払い金額: <span class="font-bold text-blue-600">{{ cart.discountedTotal.toLocaleString() }}円</span></p>
    <button @click="confirmCheckout" class="btn bg-blue-600 text-white mt-4">（仮）購入を確定する</button>
  </div>
</template>
