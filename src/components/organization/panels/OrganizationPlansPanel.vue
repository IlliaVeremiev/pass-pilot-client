<template>
  <div class="tw-flex tw-gap-3 tw-overflow-x-auto">
    <q-card v-for="plan in organization.plans" :key="plan.id" flat class="tw-border tw-rounded-xl">
      <q-card-section>
        <div class="tw-text-xl">{{ plan.name }}</div>
        <div class="tw-flex tw-flex-nowrap tw-items-baseline">
          <div class="tw-text-3xl tw-font-bold rubik-600">{{ plan.price }}</div>
          &nbsp;
          <div class="tw-text-nowrap tw-text-gray-500">per {{ plan.duration }} days</div>
        </div>
        <div class="tw-text-gray-500">{{ plan.description }}</div>
        <div class="tw-mt-3">
          <q-btn
            label="Select plan"
            @click="selectPlan(plan)"
            class="full-width"
            rounded
            color="primary"
            unelevated
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { Organization, Plan } from 'src/models/organization'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from 'src/composables/use-auth'
import { useQuasar } from 'quasar'

const props = defineProps<{
  organization: Organization
}>()

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const q = useQuasar()

function selectPlan(plan: Plan) {
  if (auth.isAuthenticated.value) {
    router.push({ name: 'payment', params: { organizationId: props.organization.id, planId: plan.id } })
  } else {
    router.push({ name: 'auth', query: { redirect: btoa(route.fullPath) } })
  }
}

</script>
<style scoped>

</style>
