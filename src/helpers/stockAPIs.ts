import { Tick } from "./db";

// RapidAPI
const RapidAPIKey = "557544e047mshccaac272e5df2f6p1a4052jsn6c70132ee8a0";
const RapidAPIHost = "alpha-vantage.p.rapidapi.com";
const RapidAPIOptions = {
  method: "GET",
  headers: { "X-RapidAPI-Key": RapidAPIKey, "X-RapidAPI-Host": RapidAPIHost },
};
/**
 * Intraday time series (timestamp, open, high, low, close, volume) of the equity specified.
 * @param ticker
 * @param interval
 * @returns
 */
export const RapidAPIIntraDay = async (
  ticker: string,
  interval: string = "1min"
) => {
  const _url = `https://${RapidAPIHost}/query?interval=${interval}&function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${ticker}&slice=year1month1&output_size=full`;
  const response = await fetch(_url, RapidAPIOptions);
  const parsed = await response.text();
  return parsed;
};

// AlphaVantage
const AlphaVantageAPIKey = "44JSWY87HQW2JDFR";
const AlphaVantageAPIOptions = {
  method: "GET",
  headers: { "User-Agent": "request", Accept: "application/json" },
};

/**
 * Intraday time series of the equity specified, covering extended trading hours where applicable.
 * https://www.alphavantage.co/documentation/#intraday
 * @param ticker
 * @param interval - Minutes per record
 * @param adjusted - Normalising stock volumes and prices to account for splits
 * @param outputsize - Compact returns only latest 100 data points, full returns 2 months
 * @param datatype
 * @returns
 */
export const AlphaVantageIntraday = async (
  ticker: string,
  interval: 1 | 5 | 15 | 30 | 60,
  outputsize?: "compact" | "full",
  datatype?: "json" | "csv",
  adjusted: boolean = true
) => {
  let _url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}min&adjusted=${adjusted}&apikey=${AlphaVantageAPIKey}`;
  if (outputsize) _url += `&outputsize=${outputsize}`;
  if (datatype) _url += `&datatype=${datatype}`;
  const response = await fetch(_url, AlphaVantageAPIOptions);
  const parsed = await response.json();
  const data = parsed[`Time Series (${interval}min)`];
  const dataKeys = Object.keys(data);
  const ticks: Tick[] = [];
  dataKeys.forEach((key) => {
    ticks.push({
      ticker,
      timestamp: new Date(key),
      open: data[key]["1. open"],
      high: data[key]["2. high"],
      low: data[key]["3. low"],
      close: data[key]["4. close"],
      volume: data[key]["5. volume"],
    });
  });
  return ticks;
};

/**
 * Intraday time series for the trailing 2 years, covering over 2 million data points per ticker.
 * https://www.alphavantage.co/documentation/#intraday-extended
 * @param ticker
 * @param interval - Minutes per record
 * @param slice - Trailing period e.g. year1month1 (most recent)
 * @param adjusted - Normalising stock volumes and prices to account for splits
 * @returns
 */
export const AlphaVantageIntradayExtended = async (
  ticker: string,
  interval: 1 | 5 | 15 | 30 | 60,
  slice?: string,
  adjusted: boolean = true
) => {
  let _url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${ticker}&interval=${interval}&adjusted=${adjusted}min&apikey=${AlphaVantageAPIKey}`;
  if (slice) _url += `&slice=${slice}`;
  const response = await fetch(_url, AlphaVantageAPIOptions);
  const parsed = await response.text();
  return parsed;
};

/**
 * This API returns the historical portfolio rankings from the Alpha Tournament.
 *
 * https://www.alphavantage.co/documentation/#portfolios
 * @returns JSON of winning portfolios
 */
export const AlphaVantageWinningPortfolios = async () => {
  const _url = `https://www.alphavantage.co/query?function=TOURNAMENT_PORTFOLIO&apikey=${AlphaVantageAPIKey}`;
  const response = await fetch(_url, AlphaVantageAPIOptions);
  const parsed = await response.json();
  return parsed;
};

/**
 * Company key financial metrics, income statements, balance sheets, cash flow, and more.
 * https://www.alphavantage.co/documentation/#fundamentals
 * @param ticker
 * @returns JSON of company data
 */
export const AlphaVantageFundamentalData = async (ticker: string) => {
  const _url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${AlphaVantageAPIKey}`;
  const response = await fetch(_url, AlphaVantageAPIOptions);
  const parsed = await response.json();
  return parsed;
};

/**
 * Market news & sentiment data derived from over 50 major financial news outlets around the world.
 * https://www.alphavantage.co/documentation/#news-sentiment
 * @returns JSON of company data
 */
export const AlphaVantageNews = async (
  tickers?: string,
  topics?: string,
  limit?: number,
  from?: string,
  to?: string
) => {
  let _url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${AlphaVantageAPIKey}`;
  if (tickers) _url += `&tickers=${tickers}`;
  if (topics) _url += `&topics=${topics}`;
  if (limit) _url += `&limit=${limit}`;
  if (from) _url += `&time_from=${from}`;
  if (to) _url += `&time_to=${to}`;
  const response = await fetch(_url, AlphaVantageAPIOptions);
  const parsed = await response.json();
  return parsed;
};
