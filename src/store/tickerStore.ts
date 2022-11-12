import { knownDB, tickDB, Ticker, tickerDB } from "@/helpers/db";
import {
  AlphaVantageFundamentalData,
  AlphaVantageIntraday,
  AlphaVantageWinningPortfolios,
} from "@/helpers/stockAPIs";
import { Ref, ref } from "vue";

export const downloadedTickers: Ref<string[]> = ref([]);
export const knownTickers: Ref<string[]> = ref([]);
const tickers: Ref<Ticker[]> = ref([]);

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

export const init = async () => {
  await refreshTickers();
};
const refreshTickers = async () => (tickers.value = await tickerDB.getAll());
export const getTicker = async (symbol: string) => await tickerDB.get(symbol);
export const addTicker = async (ticker: Ticker) => {
  await tickerDB.add(ticker);
  await refreshTickers();
};

export const spyTicker = async (symbol: string) => {
  const stored = await tickerDB.get(symbol);
  if (stored) return stored;
  const overview = await AlphaVantageFundamentalData(symbol);
  const sample = await AlphaVantageIntraday(symbol, 15, "compact");
  const ticker: Ticker = {
    symbol,
    modified: new Date(),
    overview,
    sample,
  };
  tickerDB.add(ticker);
  return ticker;
};

export const saveTicker = async (ticker: Ticker) => {};
