<template>
  <div class="chart">
    <GChart
      type="CandlestickChart"
      :data="[pricesTitles, ...prices]"
      :options="chartOptions"
    />
    <v-btn @click="load">Load</v-btn>
  </div>
</template>

<script setup lang="ts">
import { GChart } from "vue-google-charts";
import { onMounted, ref, type Ref } from "vue";

const pricesTitles: Ref<string[]> = ref([]);
const prices: Ref<[string, number, number, number, number][]> = ref([]);
const volumes: Ref<[string, string | number][]> = ref([]);

const url =
  "https://alpha-vantage.p.rapidapi.com/query?interval=1min&function=TIME_SERIES_INTRADAY_EXTENDED&symbol=MSFT&slice=year1month1&output_size=full";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "557544e047mshccaac272e5df2f6p1a4052jsn6c70132ee8a0",
    "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
  },
};

const load = async () => {
  await fetch(url, options)
    .then((res) => res.text())
    .then((text) => {
      const rows = text.split(/\r\n|\n/);
      const blankRow = rows.pop();
      const fieldsRow = rows.shift();
      if (!fieldsRow) throw new Error("No fields found");
      const fields = fieldsRow.split(/,/);
      console.log(fields);
      pricesTitles.value = [
        fields[0],
        fields[3],
        fields[1],
        fields[4],
        fields[2],
      ];

      rows.slice(30, 40).forEach((row) => {
        const values = row.split(/,/);
        if (values.length === 0) return;
        const volume = values.pop();
        prices.value.push([
          values[0],
          +values[3],
          +values[1],
          +values[4],
          +values[2],
        ]);
        if (volume) volumes.value.push([values[0], +volume]);
      });
    })
    .catch((err) => console.error("error:" + err));
  console.log(pricesTitles.value);
  console.log(prices.value);
};

const chartOptions = {
  legend: "none",
  bar: { groupWidth: "100%" }, // Remove space between bars.
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
    risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  },
};
</script>
