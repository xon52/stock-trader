<template>
  <v-card variant="flat">
    <v-card-title>Known Tickers</v-card-title>
    <div class="justify-center">
      <v-btn
        :disabled="working"
        :loading="working"
        size="small"
        variant="flat"
        block
        prepend-icon="mdi-refresh"
        @click="refreshTickers"
        >Refresh</v-btn
      >
      <v-btn
        :disabled="working"
        :loading="working"
        size="small"
        variant="flat"
        block
        prepend-icon="mdi-cloud-search"
        @click="discoverTickers"
        >Find more</v-btn
      >
      <v-text-field
        :loading="working"
        v-model="manual"
        density="compact"
        variant="filled"
        label="Search ticker"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @keydown.enter="select(manual)"
        @click:append-inner="select(manual)"
      ></v-text-field>
    </div>
    <v-card-text>
      <v-list>
        <h5>Others</h5>
        <v-list-item
          v-for="ticker in knownTickers"
          :key="ticker"
          :value="ticker"
          :active="false"
          @click="select(ticker)"
          >{{ ticker }}
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  discoverKnownTickers,
  knownTickers,
  refreshKnownTickers,
} from "@/store/tickerStore";

const emit = defineEmits<{
  (e: "select", ticker: string);
}>();

const manual = ref("");
const working = ref(false);
const refreshTickers = () => {
  working.value = true;
  refreshKnownTickers()
    .catch((e) => console.error(e))
    .finally(() => (working.value = false));
};
const discoverTickers = () => {
  working.value = true;
  discoverKnownTickers(5)
    .catch((e) => console.error(e))
    .finally(() => (working.value = false));
};

const select = (ticker: string) => {
  emit("select", ticker.toUpperCase());
};
onMounted(async () => await refreshKnownTickers());
</script>
