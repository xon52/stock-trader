<template>
  <v-card variant="flat">
    <v-card-text>
      <v-table density="compact">
        <tbody>
          <tr v-for="(v, k) in selected.overview" :key="k">
            <td>{{ k }}</td>
            <td>{{ v }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Ticker } from "@/helpers/db";
import { toRef } from "vue";

const props = defineProps<{
  selected: Ticker;
  working?: boolean;
}>();

const selected = toRef(props, "selected");
</script>
