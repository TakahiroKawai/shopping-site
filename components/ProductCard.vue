<script setup lang="ts">
import { useFavorites } from '@/composables/useFavorites'

const props = defineProps<{
  id: number
  name: string
  description: string
  price: number
  image: string
}>()

const emit = defineEmits<{
  (event: 'add-to-cart', payload: {
    name: string
    description: string
    price: number
    image: string
  }): void
}>()

const { favorites, toggleFavorite, isFavorite } = useFavorites()

const handleAddToCart = () => {
  emit('add-to-cart', { ...props })
}
</script>

<template>
  <div class="border rounded shadow p-4 bg-white">
    <img :src="image" alt="商品画像" class="w-full h-48 object-contain mb-2" />
    <h3 class="font-bold text-lg">{{ name }}</h3>
    <p class="text-sm text-gray-600">{{ description }}</p>
    <p class="text-right text-blue-600 font-bold mt-2">{{ price.toLocaleString() }}円</p>
    <button @click="toggleFavorite(id)" class="mt-2 text-sm px-3 py-1 rounded border" :class="isFavorite(id) ? 'bg-red-100 text-red-600 border-red-400' : 'bg-gray-100 text-gray-600 border-gray-300'">
      {{ isFavorite(id) ? 'お気に入り解除' : 'お気に入りに追加' }}
    </button>
    <button @click="handleAddToCart" class="w-full mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
      カートに追加
    </button>
  </div>
</template>
