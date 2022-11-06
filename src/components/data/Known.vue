<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <v-btn
        :disabled="working"
        :loading="working"
        size="small"
        variant="plain"
        icon="mdi-refresh"
        @click="refreshTickers"
      ></v-btn>
      <v-btn
        :disabled="working"
        :loading="working"
        size="small"
        variant="plain"
        icon="mdi-cloud-search"
        @click="discoverTickers"
      ></v-btn>
      Known Tickers
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <span v-if="knownTickers.length < 1">No tickers :(</span>
      <v-chip-group v-else column>
        <template v-for="ticker in knownTickers" :key="ticker">
          <v-chip @click.self="selectTicker(ticker)">
            {{ ticker }}
          </v-chip>
        </template>
      </v-chip-group>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import {
  knownTickers,
  refreshKnownTickers,
  discoverKnownTickers,
  downloadTicker,
} from "@/store/tickerStore";
import { onMounted, ref } from "vue";
const emit = defineEmits<{
  (e: "select", ticker: string): void;
}>();

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
const selectTicker = (ticker: string) => {
  working.value = true;
  downloadTicker(ticker)
    .catch((e) => console.error(e))
    .finally(() => (working.value = false));
  emit("select", ticker);
};

onMounted(async () => await refreshKnownTickers());
</script>

<style lang="scss" scoped></style>
