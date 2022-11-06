<template>
  <ModalVue>
    <template v-slot:activator="{ open }">
      <v-list-item
        prepend-icon="mdi-cloud-search"
        title="Discover"
        value="discover"
        :active="false"
        @click="open"
      ></v-list-item>
    </template>
    <template v-slot="{ close }">
      <DiscoverModalVue :close="close" />
    </template>
  </ModalVue>
</template>

<script setup lang="ts">
import ModalVue from "../shared/Modal.vue";
import DiscoverModalVue from "./DiscoverModal.vue";
</script>
