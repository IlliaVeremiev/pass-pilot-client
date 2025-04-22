<template>
  <q-page>
    <organization-banner :organization="organization" />
    <q-card-section v-if="organization">
      <q-btn
        v-if="hasPlansTab"
        @click="selectPlan"
        :disable="tab === 'plans'"
        :outline="tab === 'plans'"
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

    <q-tabs
      v-if="organization"
      :model-value="tab"
      @update:model-value="setTab"
    >
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
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Organization } from 'src/models/organization'
import OrganizationBanner from 'components/organization/OrganizationBanner.vue'
import OrganizationPlansPanel from 'components/organization/panels/OrganizationPlansPanel.vue'
import { useAuth } from 'src/composables/use-auth'

const props = defineProps<{
  organization: Organization | null
}>()

const route = useRoute()
const auth = useAuth()
const router = useRouter()

const tab = ref<string>(<string | null>route.query.tab ?? 'overview')

watch(route, (newValue) => {
  tab.value = <string>newValue.query.tab
})

function setTab(tab: string) {
  router.push({ ...route, query: { ...route.query, tab: tab } })
  console.log(tab, { ...route, query: { ...route.query, tab: tab } })
}

const hasOverviewTab = computed(() => (props.organization?.description ?? null) !== null)
const hasPlansTab = computed(() => props.organization?.plans.length ?? 0 > 0)

function selectPlan() {
  if (auth.isAuthenticated.value) {
    setTab('plans')
  } else {
    router.push({ name: 'auth', query: { redirect: btoa(route.fullPath) } })
  }
}

</script>
<style scoped>

</style>
