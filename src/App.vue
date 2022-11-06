<template>
  <v-app :theme="darkTheme ? 'dark' : 'light'">
    <TopBarVue />
    <NavPanelVue />

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import TopBarVue from "@/components/layout/TopBar.vue";
import NavPanelVue from "@/components/layout/NavPanel.vue";
import { darkTheme } from "@/store/appStore";
</script>

<style scoped></style>
