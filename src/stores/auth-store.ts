import { defineStore } from 'pinia'
import type { User } from 'src/models/user'

interface AuthStoreState {
  user: User | null;
  authenticated: boolean | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    user: null,
    authenticated: null
  }),

  getters: {},

  actions: {
    setUser(user: User | null) {
      this.user = user
      this.authenticated = user !== null
    }
  }
})
