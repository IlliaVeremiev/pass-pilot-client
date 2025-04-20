<template>
  <div class="tw-flex tw-gap-3">
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
import { Organization } from 'src/models/organization'

defineProps<{
  organization: Organization
}>()
</script>
<style scoped>

</style>
