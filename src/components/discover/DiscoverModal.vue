<template>
  <v-card width="800">
    <v-progress-linear class="position-absolute" v-if="working" indeterminate></v-progress-linear>
    <div class="d-flex">
      <div class="w-25 pa-3">
        <DiscoverListVue @select="select" />
      </div>
      <div class="w-75 pa-3">
        <DiscoverDetailsVue
          :selected="selected"
          @working="(e) => (working = e)"
        />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { refreshKnownTickers } from "@/store/tickerStore";
import DiscoverListVue from "./DiscoverList.vue";
import DiscoverDetailsVue from "./DiscoverDetails.vue";

const working = ref(false);
const selected = ref("");
const select = (x: any) => (selected.value = x);

onMounted(async () => await refreshKnownTickers());
</script>
