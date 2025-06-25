import { ref } from 'vue'

const favorites = ref<number[]>([])

export const useFavorites = () => {
  const toggleFavorite = (id: number) => {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter(item => item !== id)
    } else {
      favorites.value.push(id)
    }
  }

  const isFavorite = (id: number) => favorites.value.includes(id)

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
}
