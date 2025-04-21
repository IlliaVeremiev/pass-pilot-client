import { defineStore } from 'pinia'
import type { User } from 'src/models/user'

interface AuthStoreState {
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    user: null
  }),

  getters: {},

  actions: {
    setUser(user: User | null) {
      this.user = user
    }
  }
})
