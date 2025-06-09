<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const banners = [
  '/banners/banner1.png',
  '/banners/banner2.png',
  '/banners/banner3.png'
]

const currentIndex = ref(0)
let intervalId: NodeJS.Timeout

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % banners.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + banners.length) % banners.length
}

onMounted(() => {
  intervalId = setInterval(next, 5000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="relative w-full md:max-w-2xl mx-auto aspect-auto rounded-lg shadow-lg bg-white">
    <!-- バナー画像 -->
    <div class="w-full h-full flex items-center justify-center">
      <img
        :src="banners[currentIndex]"
        alt="バナー"
        class="object-contain w-full h-full"
      />
    </div>

    <!-- ボタンを画像の内側左右に配置 -->
    <div class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
      <button
        class="pointer-events-auto bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition"
        @click="prev"
      >
        ‹
      </button>
      <button
        class="pointer-events-auto bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition"
        @click="next"
      >
        ›
      </button>
    </div>

    <!-- インジケーター -->
    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
      <span
        v-for="(banner, index) in banners"
        :key="index"
        class="w-3 h-3 rounded-full"
        :class="index === currentIndex ? 'bg-white' : 'bg-gray-400'"
      ></span>
    </div>
  </div>
</template>
