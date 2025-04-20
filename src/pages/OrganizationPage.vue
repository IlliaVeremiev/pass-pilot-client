<template>
  <q-page>
    <organization-banner :organization="organization" />
    <q-card-section v-if="organization">
      <q-btn
        v-if="hasPlansTab"
        :disable="!organization"
        label="Select plan"
        class="full-width"
        color="primary"
        no-caps
        size="lg"
        unelevated
      />
    </q-card-section>
    <q-card-section v-else>
      <q-skeleton height="3.5em" animation="fade" />
    </q-card-section>

    <q-tabs v-if="organization" v-model="tab">
      <q-tab v-if="hasOverviewTab" label="Overview" name="overview" />
      <q-tab v-if="hasPlansTab" label="Plans" name="plans" />
    </q-tabs>
    <div v-else class="tw-flex tw-gap-2 tw-mx-2 tw-justify-between">
      <q-skeleton height="3.5em" class="tw-flex-grow" animation="fade" />
      <q-skeleton height="3.5em" class="tw-flex-grow" animation="fade" />
    </div>

    <q-tab-panels v-if="organization" v-model="tab" animated>
      <q-tab-panel v-if="hasOverviewTab" name="overview">
        {{ organization.description }}
      </q-tab-panel>
      <q-tab-panel v-if="hasPlansTab" name="plans">
        <organization-plans-panel v-if="organization" :organization="organization" />
      </q-tab-panel>
    </q-tab-panels>
    <div v-else class="tw-flex tw-flex-col tw-gap-2 tw-mx-2 tw-my-4">
      <q-skeleton width="59%" animation="fade" />
      <q-skeleton width="78%" animation="fade" />
      <q-skeleton width="98%" animation="fade" />
      <q-skeleton width="70%" animation="fade" />
      <q-skeleton width="85%" animation="fade" />
      <q-skeleton width="83%" animation="fade" />
      <q-skeleton width="95%" animation="fade" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Organization } from 'src/models/organization'
import { created } from 'src/utils/vue-utils'
import api from 'src/api'
import OrganizationBanner from 'components/organization/OrganizationBanner.vue'
import OrganizationPlansPanel from 'components/organization/panels/OrganizationPlansPanel.vue'

const route = useRoute()

const slug = computed(() => <string>route.params.slug)

const organization = ref<Organization | null>(null)
const tab = ref<string>('plans')

const hasOverviewTab = computed(() => (organization.value?.description ?? null) !== null)
const hasPlansTab = computed(() => organization.value?.plans.length ?? 0 > 0)

created(async () => {
  organization.value = await api.getOrganization(slug.value)
})

</script>
<style scoped>

</style>
