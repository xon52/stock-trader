<template>
  <v-app-bar
    theme="dark"
    image="https://picsum.photos/1920/1080?random?grayscale"
  >
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <v-app-bar-title>Photos</v-app-bar-title>

    <template #append>
      <FundsVue />
      <DateVue />
      <v-btn
        :icon="darkTheme ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        @click="toggleTheme"
      >
      </v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { darkTheme } from "@/store/appStore";
import FundsVue from "../funds/Funds.vue";
import DateVue from "../date/Date.vue";

const toggleTheme = () => (darkTheme.value = !darkTheme.value);
</script>
