<template>
  <q-page padding>
    {{ slug }}
  </q-page>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const slug = computed(() => <string>route.params.slug);

</script>
<style scoped>

</style>
