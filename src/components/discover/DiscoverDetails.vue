<template>
  <v-card varient="flat">
    <template v-if="selected.length > 0">
      <v-card-text>
        <v-table density="compact">
          <tbody>
            <tr v-for="(v, k) in details" :key="k">
              <td>{{ k }}</td>
              <td>{{ v }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-text class="w-100">
        <ul style="list-style-type: none; column-count: 2">
          <li v-for="(v, k) in other" :key="k">{{ k }}: {{ v }}</li>
        </ul>
      </v-card-text>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { getTickerInfo, knownTickers } from "@/store/tickerStore";
import { ref, Ref, toRefs, watch } from "vue";

const props = defineProps<{
  selected: string;
  working?: boolean;
}>();

const emit = defineEmits<{
  (e: "working", working: boolean);
}>();

const fields: string[] = [
  "50DayMovingAverage",
  "52WeekHigh",
  "52WeekLow",
  "200DayMovingAverage",
  "Country",
  "Description",
  "Industry",
  "MarketCapitalization",
  "Name",
  "ProfitMargin",
  "QuarterlyRevenueGrowthYOY",
  "Sector",
  "Symbol",
];
const details: Ref<Record<string, string>> = ref(null);
const other: Ref<Record<string, string>> = ref(null);

watch(
  () => props.selected,
  (s) => {
    emit("working", true);
    getTickerInfo(s)
      .then((info) => {
        details.value = {};
        other.value = {};
        Object.keys(info).forEach((key) => {
          if (fields.includes(key)) details.value[key] = info[key];
          else other.value[key] = info[key];
        });
      })
      .catch((e) => console.error(e))
      .finally(() => {
        emit("working", false);
      });
  }
);
</script>
