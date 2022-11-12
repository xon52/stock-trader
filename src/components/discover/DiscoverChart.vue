<template>
  <v-card variant="flat">
    <v-card-text>
      <GChart
        type="CandlestickChart"
        :data="stockData"
        :options="stockOptions"
        is-first-row-labels
      />
      <GChart
        type="LineChart"
        :data="volumeData"
        :options="volumeOptions"
        is-first-row-labels
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { GChart } from "vue-google-charts";
import { Ticker } from "@/helpers/db";
import { computed } from "@vue/reactivity";
import { toRef } from "vue";
import { GoogleChartOptions } from "vue-google-charts/dist/types";

const props = defineProps<{
  selected: Ticker;
  working?: boolean;
}>();

const selected = toRef(props, "selected");
const stockData = computed(() =>
  selected.value.sample.map((s, i) => [
    s.timestamp,
    +s.low,
    +s.open,
    +s.close,
    +s.high,
  ])
);
const volumeData = computed(() =>
  selected.value.sample.map((s) => [s.timestamp, +s.volume])
);

const stockOptions: GoogleChartOptions = {
  legend: "none",
  bar: { groupWidth: "100%" }, // Remove space between bars.
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
    risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  },
  title: "Stock Price",
  vAxis: { title: "", format: "'$'#" },
};
const volumeOptions: GoogleChartOptions = {
  legend: "none",
  title: "Volume Traded",
};
</script>
