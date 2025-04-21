<template>
  <q-form @submit="login" class="tw-flex tw-flex-col tw-gap-1 tw-mb-2">
    <q-input
      v-model="email"
      :disable="q.loading.isActive"
      label="Email"
      outlined
      dense
      autocomplete="email"
      :rules="[
        val => !!val || 'Email is required',
        val => emailRegex.test(val) || 'Please enter valid email',
      ]"
    />
    <q-input
      v-model="password"
      :disable="q.loading.isActive"
      label="Password"
      outlined
      dense
      autocomplete="password"
      type="password"
      bottom-slots
    />
    <q-btn
      :disable="q.loading.isActive"
      type="submit"
      label="Sign In"
      class="tw-w-full"
      color="primary"
      unelevated
      no-caps
    />
  </q-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from 'src/composables/use-auth'
import { emailRegex } from 'src/utils/constants'
import { useQuasar } from 'quasar'
import { errorMessage } from 'src/utils/error'
import { useLoading } from 'src/composables/use-loading'

const q = useQuasar()
const auth = useAuth()
const loading = useLoading()

const email = ref('')
const password = ref('')

async function login() {
  try {
    loading.signIn.show()
    await auth.login({
      email: email.value,
      password: password.value
    })
  } catch (e) {
    q.notify({ message: errorMessage(e), type: 'negative' })
  } finally {
    loading.signIn.hide()
  }
}

</script>
