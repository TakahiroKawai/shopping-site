<script setup lang="ts">

import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import CartDropdown from '~/components/CartDropdown.vue'
import BannerSlider from '~/components/BannerSlider.vue'
import CouponForm from '~/components/CouponForm.vue'
import ProductCard from '~/components/ProductCard.vue'

const products = ref([])

onMounted(async () => {
  products.value = await $fetch('/api/products')
})

const handleAddToCart = (product: typeof products[0]) => {
  cart.addToCart(product)
}

const cart = useCartStore()
const user = useUserStore()

const keyword = ref('')

const searchProducts = async () => {
  products.value = await $fetch('/api/search', {
    params: { q: keyword.value }
  })
}

const clearSearch = async () => {
  keyword.value = ''
  products.value = await $fetch('/api/products')
}
</script>

<template>
  <header class="flex justify-between items-center p-4">
    <h1 class="text-xl font-bold">ショッピングサイト</h1>
    <CartToggle />
  </header>

  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">ショッピングサイト</h1>

    <div class="p-4 space-y-6">
      <BannerSlider />
    </div>

    <div class="flex gap-2 mb-4">
      <input v-model="keyword" type="text" placeholder="商品名を入力" class="border rounded p-2 flex-1"/>
      <button @click="clearSearch" class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
        クリア
      </button>
      <button @click="searchProducts" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        検索
      </button>
    </div>

    <section class="my-8">
      <h2 class="text-xl font-bold mb-4">商品一覧</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductCard v-for="product in products" v-bind="product" @add-to-cart="handleAddToCart"/>
      </div>
    </section>
    <CouponForm />
  </div>
</template>
