<template>
  <q-form @submit="registerUser" class="tw-flex tw-flex-col tw-gap-1 tw-mb-2">
    <q-input
      v-model="name"
      :disable="q.loading.isActive"
      label="Full name"
      outlined
      dense
      :rules="validateFullName"
      autocomplete="cc-name"
    />
    <q-input
      v-model="email"
      :disable="q.loading.isActive"
      label="Email"
      outlined
      dense
      :rules="validateEmail"
      autocomplete="email"
      type="email"
    />
    <q-input
      v-model="password"
      :disable="q.loading.isActive"
      label="Password"
      outlined
      dense
      :rules="validatePassword"
      autocomplete="password"
      type="password"
    />
    <q-btn
      :disable="q.loading.isActive"
      type="submit"
      label="Sign Up"
      class="tw-w-full"
      color="primary"
      unelevated
      no-caps
    />
  </q-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { emailRegex } from 'src/utils/constants'
import api from 'src/api'
import { useQuasar } from 'quasar'
import { errorMessage } from 'src/utils/error'
import { useAuth } from 'src/composables/use-auth'
import { useLoading } from 'src/composables/use-loading'

const q = useQuasar()
const auth = useAuth()
const loading = useLoading()

const email = ref('')
const password = ref('')
const name = ref('')

const validateFullName = [
  (name: string) => name.length >= 2 || 'Enter name'
]

const validateEmail = [
  (email: string) => emailRegex.test(email) || 'Invalid email'
]

const validatePassword = [
  (password: string) => password.length >= 8 || 'Minimum 8 characters'
]

async function registerUser() {
  try {
    loading.registerUser.show()
    await api.registerUser({
      name: name.value,
      email: email.value,
      password: password.value
    })
    loading.signIn.show()
    await auth.login({
      email: email.value,
      password: password.value
    })
  } catch (e) {
    q.notify({ message: errorMessage(e), type: 'negative' })
  } finally {
    loading.registerUser.hide()
    loading.signIn.hide()
  }
}

</script>
