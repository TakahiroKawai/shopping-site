<script setup lang="ts">
const props = defineProps<{
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
    <button @click="handleAddToCart" class="w-full mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
      カートに追加
    </button>
  </div>
</template>
