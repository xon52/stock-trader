<template>
  <v-card class="mx-auto px-6 py-8" max-width="800">
    <v-snackbar
      v-if="notice"
      @update:model-value="notice = null"
      :timeout="2000"
      :color="notice[0]"
      elevation="24"
    >
      {{ notice[1] }}
    </v-snackbar>

    <v-expansion-panels>
      <DownloadedVue />
      <KnownVue />
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import DownloadedVue from "@/components/data/Downloaded.vue";
import KnownVue from "@/components/data/Known.vue";

const notice: Ref<[string, string] | null> = ref(null);
</script>
