import { computed } from 'vue'
import { useRouter } from 'vue-router'
import api from 'src/api'
import { useLoading } from 'src/composables/use-loading'
import { useAuthStore } from 'stores/auth-store'
import CredentialResponse = google.accounts.id.CredentialResponse
import PromptMomentNotification = google.accounts.id.PromptMomentNotification

export interface UserLogin {
  email: string
  password: string
}

export interface ExternalAuthRequest {
  provider: string
  idToken: string
}

const accessToken = 'accessToken'

export const useAuth = () => {
  const router = useRouter()
  const loading = useLoading()
  const authStore = useAuthStore()

  const token = computed({
    get: () => localStorage.getItem(accessToken),
    set: (newToken) => newToken !== null ? localStorage.setItem(accessToken, newToken) : localStorage.removeItem(accessToken)
  })
  const isAuthenticated = computed(() => authStore.user !== null)
  const user = computed(() => authStore.user)

  async function login(credentials: UserLogin) {
    const response = await api.login(credentials)
    token.value = response.token
    await loadUser()
    await router.push({ name: 'home' })
  }

  async function logout() {
    authStore.setUser(null)
    token.value = null
    await router.push({ name: 'home' })
  }

  async function loadUser() {
    try {
      authStore.setUser(await api.getAuthenticatedUser())
    } catch (error) {
      token.value = null
      throw error
    }
  }

  function initializeGoogleLogin() {
    return new Promise((resolve) => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_ACCOUNT_ID,
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        callback: handleGoogleCallback
      })

      google.accounts.id.prompt((notification: PromptMomentNotification) => {
        if (notification.isNotDisplayed()) {
          resolve(null)
        }
        if (notification.isSkippedMoment()) {
          resolve(null)
        }
      })
      resolve(true)
    })
  }

  async function handleGoogleCallback(response: CredentialResponse) {
    try {
      loading.signIn.show()
      const apiResponse = await api.externalLogin({ provider: 'google', idToken: response.credential })
      token.value = apiResponse.token
      await loadUser()
      await router.push({ name: 'home' })
    } finally {
      loading.signIn.hide()
    }
  }

  return {
    isAuthenticated,
    login,
    logout,
    loadUser,
    user,
    initializeGoogleLogin
  }
}
