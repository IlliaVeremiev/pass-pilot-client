<template>
  <q-card v-ripple class="tw-rounded-none tw-bg-gray-300" flat>
    <div v-if="organization" class="tw-relative">
      <q-img
        src="/banner.jpg"
        fit="cover"
        height="300px"
      />
      <q-card-section class="tw-absolute tw-bottom-2">
        <div class="tw-text-white tw-text-3xl tw-font-bold">
          {{ organization?.name }}
        </div>
      </q-card-section>
    </div>
    <q-skeleton
      v-else
      square
      height="300px"
      animation="blink"
    >
      <q-skeleton
        class="tw-absolute tw-bottom-7 tw-left-4"
        height="2em"
        width="35%"
        animation="fade"
      />
    </q-skeleton>
  </q-card>
</template>
<script setup lang="ts">
import { Organization } from 'src/models/organization'

defineProps<{
  organization: Organization | null
}>()

</script>
<style scoped>

</style>
