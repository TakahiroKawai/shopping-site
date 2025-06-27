<template>
  <div class="p-4">
    <h1 class="text-xl font-bold">商品詳細ページ</h1>
    <p class="mt-2">商品ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
