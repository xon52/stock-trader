import { Ref, ref } from "vue";

export type Notice = {
  id: number;
  color: string;
  message: string;
};

export const notices: Ref<Notice[]> = ref([]);

export const addError = (message: string) => addNotice("error", message);

export const addNotice = (color: string, message: string) => {
  const id = notices.value.length
    ? notices.value.reduce(
        (acc, cur) => (cur.id > acc ? cur.id + 1 : acc + 1),
        1
      )
    : 1;
  notices.value.push({ id, color, message });
};
export const removeNotice = (id: number) => {
  const index = notices.value.findIndex((n) => n.id === id);
  notices.value.splice(index, 1);
};
