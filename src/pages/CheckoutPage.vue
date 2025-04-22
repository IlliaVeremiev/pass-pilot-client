<template>
  <q-page v-if="plan" class="column">
    <q-form class="tw-flex-grow column" @submit="submitPayment">
      <q-card-section>
        <div class="tw-text-2xl tw-font-semibold tw-mb-4">Checkout</div>
        <div class="tw-flex tw-flex-col tw-gap-2">
          <q-input
            v-if="user"
            label="Email"
            :model-value="user.email"
            outlined
            dense
            type="email"
            readonly
          />
          <q-input
            v-if="user"
            label="Name"
            :model-value="user.name"
            outlined
            dense
            readonly
          />
          <q-input
            v-if="plan"
            label="Plan"
            :model-value="plan.name"
            outlined
            dense
            readonly
          />
        </div>
        <div v-if="planId">
          <div class="tw-flex tw-justify-between tw-items-center tw-my-2 tw-text-md tw-font-normal">
            <div>Price</div>
            <div class="rubik-600">{{ plan.price }} DKK / {{ plan.duration }} days</div>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center tw-my-2 tw-text-lg tw-font-medium">
            <div>Total</div>
            <div class="rubik-600">{{ plan.price }} DKK</div>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center tw-my-2 tw-text-md tw-font-normal">
            <div>Vat</div>
            <div class="rubik-600">{{ vat }} DKK</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="tw-mt-auto">
        <div
          class="tw-flex tw-flex-nowrap tw-justify-between tw-items-center tw-my-1 tw-cursor-pointer"
          @click="termsAccepted = !termsAccepted"
        >
          <div class="text-sm font-medium">
            I accept the
            <q-btn
              label="terms and privacy policy"
              flat
              class="tw-underline"
              dense
              no-caps
              @click.stop="showTerms"
              :ripple="false"
            />
            <span class="tw-font-bold text-negative">*</span>

          </div>
          <q-checkbox
            :color="hasError ? 'negative' : 'primary'"
            keep-color
            v-model="termsAccepted"
            @update:model-value="validate"
            dense
          />
        </div>

        <q-btn
          class="tw-rounded-lg tw-w-full rubik-600"
          color="primary"
          no-caps
          size="lg"
          type="submit"
          unelevated
        >
          Pay {{ plan.price }} DKK
        </q-btn>
      </q-card-section>
    </q-form>
  </q-page>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Organization } from 'src/models/organization'
import { useAuth } from 'src/composables/use-auth'
import { useQuasar } from 'quasar'
import TermsAndPrivacyPolicyDialog from 'components/terms/TermsAndPrivacyPolicyDialog.vue'
import { errorMessage } from 'src/utils/error'
import { useLoading } from 'src/composables/use-loading'
import { created } from 'src/utils/vue-utils'

const props = defineProps<{
  organization: Organization | null
}>()

const route = useRoute()
const auth = useAuth()
const q = useQuasar()
const loading = useLoading()

const planId = computed(() => <string>route.params.planId)
const plan = computed(() => props.organization?.plans.find(p => p.id === planId.value) ?? null)
const user = computed(() => auth.user.value)
const vat = computed(() => plan.value?.price.multiply('0.2') ?? null)

const termsAccepted = ref(false)

const hasError = ref<boolean>(false)

function showTerms() {
  q.dialog({
    component: TermsAndPrivacyPolicyDialog
  })
}

watch(() => termsAccepted, () => {
  validate()
})

function validate() {
  hasError.value = !termsAccepted.value
  return !hasError.value
}

function submitPayment() {
  if (!validate()) {
    return
  }
  try {
    loading.payment.show()
  } catch (e) {
    q.notify({ message: errorMessage(e), type: 'negative' })
  } finally {
    loading.payment.hide()
  }
}

created(async () => {
  try {
    loading.loading.show()
    await auth.requireAuthentication()
  } finally {
    loading.loading.hide()
  }
})

</script>
<style scoped>

</style>
