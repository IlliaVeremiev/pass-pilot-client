<template>
  <router-view />
</template>
<script setup lang="ts">
import { useAuth } from 'src/composables/use-auth'
import { created } from 'src/utils/vue-utils'

const auth = useAuth()

created(async () => {
  await auth.loadUser()
})
</script>
