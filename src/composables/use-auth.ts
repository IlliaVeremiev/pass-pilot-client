import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from 'src/api'
import { User } from 'src/models/user'

export interface UserLogin {
  email: string
  password: string
}

const accessToken = 'accessToken'

export const useAuth = () => {
  const router = useRouter()

  const token = computed({
    get: () => localStorage.getItem(accessToken),
    set: (newToken) => newToken !== null ? localStorage.setItem(accessToken, newToken) : localStorage.removeItem(accessToken)
  })
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => token.value !== null)

  async function login(credentials: UserLogin) {
    const response = await api.login(credentials)
    token.value = response.token
    await loadUser()
    await router.push({ name: 'home' })
  }

  async function logout() {
    user.value = null
    token.value = null
    await router.push({ name: 'home' })
  }

  async function loadUser() {
    try {
      user.value = await api.getAuthenticatedUser()
    } catch (error) {
      token.value = null
      throw error
    }
  }

  return {
    isAuthenticated,
    login,
    logout,
    user
  }
}
