<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import CartDropdown from '~/components/CartDropdown.vue'
import BannerSlider from '~/components/BannerSlider.vue'
import CouponForm from '~/components/CouponForm.vue'
import ProductCard from '~/components/ProductCard.vue'

const { data: products, pending, error } = await useFetch('/api/products')

const handleAddToCart = (product: typeof products[0]) => {
  cart.addToCart(product)
}

const cart = useCartStore()
const user = useUserStore()
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

    <section class="my-8">
      <h2 class="text-xl font-bold mb-4">商品一覧</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductCard v-for="product in products" v-bind="product" @add-to-cart="handleAddToCart"/>
      </div>
    </section>
    <CouponForm />
  </div>
</template>
