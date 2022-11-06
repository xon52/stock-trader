<template>
  <ModalVue>
    <template v-slot:activator="{ open }">
      <v-btn
        size="x-large"
        class="text-h5"
        :class="funds > 0 ? 'text-green-accent-1' : 'text-red-accent-1'"
        @click="open"
      >
        {{ formatCurrency(funds) }}
      </v-btn>
    </template>
    <template v-slot="{ close }">
      <FundsModalVue :close="close" />
    </template>
  </ModalVue>
</template>

<script setup lang="ts">
import { funds } from "@/store/appStore";
import ModalVue from "../shared/Modal.vue";
import FundsModalVue from "./FundsModal.vue";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
</script>
