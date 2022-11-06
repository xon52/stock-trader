<template>
  <v-card class="mx-auto" :width="300">
    <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
      <v-card-title>
        <span class="text-h5">Edit start date</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="temp"
          :readonly="loading"
          :rules="[required]"
          type="date"
          label="Start date"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!valid"
          :loading="loading"
          :color="valid ? 'success' : ''"
          size="large"
          type="submit"
          variant="elevated"
        >
          Update
        </v-btn>
        <v-spacer />
        <v-btn :loading="loading" size="large" @click="onCancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { date } from "@/store/appStore";
import { ref } from "vue";
import dayjs from "dayjs";
const props = defineProps<{
  close: () => void;
}>();

const valid = ref(true);
const loading = ref(false);
const temp = ref(dayjs(date.value).format("YYYY-MM-DD"));

const required = (v: any) => !!v || "Field is required";

const onSubmit = async () => {
  if (!valid.value) return;
  loading.value = true;
  date.value = dayjs(temp.value).toDate();
  loading.value = false;
  props.close();
};

const onCancel = () => {
  props.close();
};
</script>
