import { Ref, ref } from "vue";

export const darkTheme = ref(
  !!globalThis.matchMedia("(prefers-color-scheme: dark)")
);

export const funds = ref(10000);
export const date = ref(new Date(2020, 0, 1, 0, 0, 0));
