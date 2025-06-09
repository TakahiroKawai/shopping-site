<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CartDropdown from './CartDropdown.vue'

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// ドロップダウン外クリックで閉じる処理
onMounted(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.cart-container')) {
      isOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <div class="relative cart-container inline-block">
    <!-- トグルボタン -->
    <button @click="toggleDropdown" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
      🛒 カート
    </button>

    <!-- ドロップダウン本体 -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded z-50"
    >
      <CartDropdown />
    </div>
  </div>
</template>
