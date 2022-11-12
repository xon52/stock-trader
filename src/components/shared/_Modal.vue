<template>
  <v-overlay
    :model-value="true"
    :persistent="props.persistent"
    class="align-center justify-center"
    @after-leave="onClose"
  >
    <div class="overflow-auto" style="max-width: 80vw; max-height: 80vh;">
      <slot></slot>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
const props = defineProps<{
  persistent?: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const onClose = () => {
  emit("close");
};
</script>
