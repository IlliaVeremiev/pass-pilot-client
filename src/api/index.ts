import axios from 'axios'
import { Organization } from 'src/models/organization'

const base = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default {
  getOrganization: async (id: string): Promise<Organization> => {
    const response = await api.get<Organization>(`/organizations/${id}`)
    return response.data
  }
}
