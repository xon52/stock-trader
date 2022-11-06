<template>
  <ModalVue>
    <template v-slot:activator="{ open }">
      <v-btn size="x-large" class="text-h6 font-italic" @click="open">
        {{ formatDate(date) }}
      </v-btn>
    </template>
    <template v-slot="{ close }">
      <DateModalVue :close="close" />
    </template>
  </ModalVue>
</template>

<script setup lang="ts">
import { date } from "@/store/appStore";
import ModalVue from "../shared/Modal.vue";
import DateModalVue from "./DateModal.vue";

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
  }).format(d);
</script>
