// stores/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { id: number; name: string; price: number }[],
    appliedDiscount: 0
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0),
    discountedTotal: (state) =>
      Math.floor(state.items.reduce((sum, item) => sum + item.price, 0) * (1 - state.appliedDiscount))
  },
  actions: {
    addToCart(item: { id: number; name: string; price: number }) {
      this.items.push(item)
      this.saveCart()
    },
    applyDiscount(rate: number) {
      this.appliedDiscount = rate
    },
    clearCart() {
      this.items = []
      this.saveCart()
    },
    saveCart() {
      const user = useUserStore()
      if (user.isLoggedIn) {
        localStorage.setItem('user_cart', JSON.stringify(this.items))
      }
    },
    loadCart() {
      const user = useUserStore()
      if (user.isLoggedIn) {
        const saved = localStorage.getItem('user_cart')
        if (saved) {
          this.items = JSON.parse(saved)
        }
      }
    }
  }
})

