import { useCartStore } from '~/stores/cart'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    login() {
      this.isLoggedIn = true
      return true
    },
    logout() {
      this.isLoggedIn = false
    },
    checkout(){
      alert('決済処理を開始します（仮）')
    }
  }
})
