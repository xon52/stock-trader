<template>
  <v-snackbar
    v-for="notice in notices"
    :key="notice.id"
    model-value
    :color="notice.color"
    :timeout="2000"
    close-on-content-click
    location="bottom center"
    @update:model-value="removeNotice(notice.id)"
  >
    {{ notice.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { notices, removeNotice } from "@/store/noticeStore";
</script>
