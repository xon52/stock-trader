<template>
  <slot name="activator" :open="open"></slot>
  <ModalVue v-if="modal" @close="modalClose">
    <slot :close="close"></slot>
  </ModalVue>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalVue from "./_Modal.vue";

const emit = defineEmits<{
  (e: "close");
}>();

const modal = ref(false);

const open = () => {
  modal.value = true;
};
const close = () => {
  emit("close");
  modal.value = false;
};
const modalClose = () => {
  close();
};
</script>
