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
      Downloaded Tickers
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <span v-if="downloadedTickers.length < 1">No tickers :(</span>
      <v-chip-group v-else column>
        <template v-for="ticker in downloadedTickers" :key="ticker">
          <v-chip
            @click.self="selectTicker(ticker)"
            closable
            @click:close="deleteTicker(ticker)"
          >
            {{ ticker }}
          </v-chip>
        </template>
      </v-chip-group>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import {
  downloadedTickers,
  refreshDownloadedTickers,
} from "@/store/tickerStore";
import { onMounted, ref } from "vue";
const emit = defineEmits<{
  (e: "select", ticker: string): void;
  (e: "delete", ticker: string): void;
}>();

const working = ref(false);
const refreshTickers = async () => {
  working.value = true;
  await refreshDownloadedTickers();
  working.value = false;
};
const selectTicker = (ticker: string) => emit("select", ticker);
const deleteTicker = (ticker: string) => emit("delete", ticker);

onMounted(async () => await refreshDownloadedTickers());
</script>

<style lang="scss" scoped></style>
