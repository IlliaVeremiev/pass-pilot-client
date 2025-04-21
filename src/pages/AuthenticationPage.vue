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
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import RegistrationForm from 'components/auth/RegistrationForm.vue'
import LoginForm from 'components/auth/LoginForm.vue'
import { useQuasar } from 'quasar'

const q = useQuasar()

const hasAccount = ref<boolean>(true)

</script>
