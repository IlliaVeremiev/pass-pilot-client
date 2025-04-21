<template>
  <q-page padding class="justify-center tw-flex tw-flex-col">
    <div class="tw-flex tw-flex-col tw-justify-center">
      <login-form v-if="hasAccount" />
      <registration-form v-else />
      <q-btn
        :label="hasAccount ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'"
        :disable="q.loading.isActive"
        @click="hasAccount = !hasAccount"
        no-caps
        :ripple="false"
        dense
        class="tw-underline"
        flat
      />
      <component v-bind:is="'script'" src="https://accounts.google.com/gsi/client" @load="initSignIn" async />
      <div class="tw-flex tw-items-center tw-flex-nowrap">
        <q-separator class="tw-flex-grow" inset />
        or
        <q-separator class="tw-flex-grow" inset />
      </div>
      <div class="tw-flex tw-justify-center tw-mt-2">
        <div ref="googleSignInButton" />
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import RegistrationForm from 'components/auth/RegistrationForm.vue'
import LoginForm from 'components/auth/LoginForm.vue'
import { useQuasar } from 'quasar'
import { useAuth } from 'src/composables/use-auth'

const q = useQuasar()
const auth = useAuth()

const hasAccount = ref<boolean>(true)
const googleSignInButton = useTemplateRef<HTMLDivElement>('googleSignInButton')

function initSignIn() {
  // googleScriptLoaded.value = true
  auth.initializeGoogleLogin()
  if (googleSignInButton.value) {
    google.accounts.id.renderButton(
      googleSignInButton.value,
      {type: 'standard', theme: 'outline', size: 'large'}
    )
  }
}

</script>
