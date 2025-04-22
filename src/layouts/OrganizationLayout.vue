<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view :organization="organization" />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
    </q-footer>

  </q-layout>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Organization } from 'src/models/organization'
import { useRoute } from 'vue-router'
import { created } from 'src/utils/vue-utils'
import api from 'src/api'

const route = useRoute()

const organizationId = computed(() => <string>route.params.organizationId)
const organization = ref<Organization | null>(null)

created(async () => {
  organization.value = await api.getOrganization(organizationId.value)
})

</script>
<style scoped>

</style>
