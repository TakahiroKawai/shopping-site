<script setup lang="ts">

import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import CartDropdown from '~/components/CartDropdown.vue'
import BannerSlider from '~/components/BannerSlider.vue'
import CouponForm from '~/components/CouponForm.vue'
import ProductCard from '~/components/ProductCard.vue'
import { useI18n } from '#imports'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const products = ref([])
const totalPages = ref(1)

const cart = useCartStore()
const user = useUserStore()

const router = useRouter()
const route = useRoute()

const currentPage = ref(Number(route.query.page) || 1)

const category = ref(route.query.category || '')
const price = ref(route.query.price || '')

const keyword = ref('')

const fetchProducts = async () => {
  const res = await $fetch('/api/products', {
    query: {
      page: currentPage.value,
      category: category.value,
      price: price.value,
    }
  })
  products.value = res.items
  totalPages.value = res.totalPages
}

watch(() => route.query, () => {
  fetchProducts()
}, { immediate: true, deep: true })

const goToPage = (p: number) => {
  router.push({ path: '/', query: { page: p } })
}

const handleAddToCart = (product: typeof products[0]) => {
  cart.addToCart(product)
}

const applyFilters = () => {
  router.push({
    query: {
      ...route.query,
      category: category.value || undefined,
      price: price.value || undefined,
      page: 1,
    },
  })
}

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
    <h1 class="text-xl font-bold">{{ $t('site') }}</h1>
    <CartToggle />
  </header>

  <div class="mb-4">
    <select id="language-select" :value="locale" @change="(e) => navigateTo(switchLocalePath(e.target.value))">
      <option v-for="loc in locales" :key="loc.code" :value="loc.code">
        {{ loc.name }}
      </option>
    </select>
  </div>

  <div class="p-4">
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

    <div class="mb-4 flex flex-wrap gap-4 items-center">
      <select v-model="category" class="border px-2 py-1" @change="applyFilters">
        <option value="">すべてのカテゴリー</option>
        <option value="Tops">トップス</option>
        <option value="Cap">キャップ</option>
        <option value="Bottoms">ボトムス</option>
        <option value="Shoes">シューズ</option>
      </select>

      <select v-model="price" class="border px-2 py-1" @change="applyFilters">
        <option value="">すべての価格</option>
        <option value="low">〜3000円</option>
        <option value="mid">3000〜10000円</option>
        <option value="high">10000円以上</option>
      </select>
    </div>

    <section class="my-8">
      <h2 class="text-xl font-bold mb-4">{{ $t('title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductCard v-for="product in products" v-bind="product" @add-to-cart="handleAddToCart"/>
      </div>
    </section>
    <div class="flex justify-center mt-6 gap-2">
      <button v-for="p in totalPages" :key="p" @click="goToPage(p)" :class="['px-3 py-1 border rounded', { 'bg-blue-500 text-white': p === currentPage }]">
        {{ p }}
      </button>
    </div>
    <CouponForm />
  </div>
</template>
