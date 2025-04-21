import axios from 'axios'
import { Organization } from 'src/models/organization'
import { ExternalAuthRequest, UserLogin } from 'src/composables/use-auth'
import { CreateUserForm } from 'src/dto/user'
import { User } from 'src/models/user'

const base = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

api.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return request
}, (error: Error) => {
  return Promise.reject(error)
})

export default {
  async getOrganization(id: string): Promise<Organization> {
    const response = await api.get<Organization>(`/organizations/${id}`)
    return response.data
  },
  async registerUser(form: CreateUserForm) {
    await api.post('/register', form)
  },
  async getAuthenticatedUser(): Promise<User> {
    const response = await api.get<User>('/auth')
    return response.data
  },
  async login(credentials: UserLogin): Promise<{ token: string }> {
    const response = await api.post<{ token: string }>('/login', credentials)
    return response.data
  },
  async externalLogin(authRequest: ExternalAuthRequest): Promise<{ token: string }> {
    const response = await api.post('/sso/verify', authRequest)
    return response.data
  }
}
