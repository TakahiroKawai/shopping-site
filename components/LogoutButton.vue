<template>
  <button @click="handleLogout" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
    ログアウト
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'logout'): void
}>()

const handleLogout = () => {
  emit('logout')
}
</script>
