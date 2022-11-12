<template>
  <v-text-field
    :disabled="working"
    v-model="symbol"
    density="compact"
    variant="filled"
    label="Search ticker"
    append-inner-icon="mdi-magnify"
    single-line
    hide-details
    @keydown.enter="select(symbol)"
    @click:append-inner="select(symbol)"
  ></v-text-field>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps<{
  working: boolean;
}>();

const { working } = toRefs(props);

const emit = defineEmits<{
  (e: "select", ticker: string);
}>();

const symbol = ref("");
const select = async (ticker: string) => emit("select", ticker.toUpperCase());
</script>
