<template>
  <v-card width="800" max-width="80vw" rounded="lg">
    <v-progress-linear
      class="position-absolute"
      v-if="working"
      indeterminate
    ></v-progress-linear>
    <v-card-title>
      <DiscoverSearchVue
        :working="working"
        @working="setWorking"
        @select="setSelected"
      />
    </v-card-title>
    <v-card-text v-if="selected" class="overflow-auto" style="height: 60vh">
      <DiscoverChartVue :selected="selected" />
      <DiscoverDetailsVue :selected="selected" />
    </v-card-text>
    <v-card-actions v-if="selected">
      <v-btn
        prepend-icon="mdi-plus"
        color="success"
        :disabled="working"
        @click="saveSelected"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Ticker } from "@/helpers/db";
import { ref, Ref } from "vue";
import { spyTicker, saveTicker } from "@/store/tickerStore";
import DiscoverDetailsVue from "./DiscoverDetails.vue";
import DiscoverSearchVue from "./DiscoverSearch.vue";
import DiscoverChartVue from "./DiscoverChart.vue";
import { addError } from "@/store/noticeStore";

const working = ref(false);

const selected: Ref<Ticker> = ref();
const setWorking = async (e: boolean) => (working.value = e);
const setSelected = (e: string) => {
  working.value = true;
  spyTicker(e)
    .then((result) => (selected.value = result))
    .catch((err) => addError("Ticker not found."))
    .finally(() => (working.value = false));
};
const saveSelected = async () => {
  working.value = true;
  await saveTicker(selected.value);
  working.value = false;
};
</script>
