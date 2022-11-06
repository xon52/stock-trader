<template>
  <v-navigation-drawer permanent expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        value="home"
        to="/"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-database"
        title="Data"
        value="data"
        to="/data"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-home-search"
        title="About"
        value="about"
        to="/about"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-chart-waterfall"
        title="Chart"
        value="chart"
        to="/chart"
      ></v-list-item>
      <DiscoverVue />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import DiscoverVue from "../discover/Discover.vue";
</script>
