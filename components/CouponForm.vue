<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()

const couponCode = ref('')
const appliedDiscount = ref(0)
const error = ref('')

// クーポン定義（IDと割引率）
const coupons = {
  'DISCOUNT10': 0.1,
  'SAVE20': 0.2
}

const applyCoupon = () => {
  const code = couponCode.value.trim().toUpperCase()
  if (coupons[code]) {
    const rate = coupons[code]
    cart.applyDiscount(rate)
    appliedDiscount.value = rate
    error.value = ''
  } else {
    cart.applyDiscount(0)
    appliedDiscount.value = 0
    error.value = '無効なクーポンコードです'
  }
}

const discountedTotal = computed(() => {
  return Math.floor(cart.totalPrice * (1 - appliedDiscount.value))
})
</script>

<template>
  <div class="border rounded p-4 mt-6 bg-gray-50 max-w-md mx-auto">
    <h2 class="font-bold mb-2">クーポンをお持ちですか？</h2>
    <div class="flex gap-2 mb-2">
      <input
        v-model="couponCode"
        class="flex-1 border px-3 py-1 rounded"
        type="text"
        placeholder="クーポンコードを入力"
      />
      <button @click="applyCoupon" class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
        適用
      </button>
    </div>
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    <p v-if="appliedDiscount > 0" class="text-green-600 text-sm">
      クーポンが適用されました！割引後合計：{{ discountedTotal.toLocaleString() }}円
    </p>
    <p v-else class="text-gray-600 text-sm">現在の合計：{{ cart.totalPrice.toLocaleString() }}円</p>
  </div>
</template>
