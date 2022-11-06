import { knownDB, tickDB } from "@/helpers/db";
import {
  AlphaVantageFundamentalData,
  AlphaVantageIntraday,
  AlphaVantageWinningPortfolios,
} from "@/helpers/stockAPIs";
import { Ref, ref } from "vue";

export const downloadedTickers: Ref<string[]> = ref([]);
export const knownTickers: Ref<string[]> = ref([]);

export const downloadTicker = async (ticker: string) => {
  const data1 = await AlphaVantageIntraday(ticker, 1, "full");
  const data2 = await AlphaVantageFundamentalData(ticker);
  console.log("data1", data1);
  console.log("data2", data2);
};
/**
 * Load downloaded tickers from the local DB into the app session.
 */
export const refreshDownloadedTickers = async () => {
  downloadedTickers.value = await tickDB.getTickers();
};
/**
 * Load known tickers from the local DB into the app session.
 */
export const refreshKnownTickers = async () => {
  knownTickers.value = await knownDB.getTickers();
};
/**
 * Find more tickers for the known database
 * @param minGain - Minimum portfolio % gain to include
 */
export const discoverKnownTickers = async (minGain?: number) => {
  const set = new Set<string>();
  const data = await AlphaVantageWinningPortfolios();
  data.ranking
    .filter((r: any) => minGain === undefined || r.percent_gain > minGain)
    .forEach((r: any) => r.portfolio.forEach((p: any) => set.add(p.symbol)));
  const newKnowns = Array.from(set).map((e) => ({ id: e }));
  await knownDB.clear();
  await knownDB.bulkAdd(newKnowns);
  await refreshKnownTickers();
};

/**
 * Find business information about the provided ticker
 * @param ticker
 * @returns Information about the given ticker
 */
export const getTickerInfo = async (ticker: string) => {
  const data = await AlphaVantageFundamentalData(ticker);
  return data;
};
