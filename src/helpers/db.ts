import Dexie, { Table } from "dexie";

interface KnownTicker {
  id: string;
  data?: Object;
}

export interface Tick {
  id?: number;
  timestamp: Date;
  ticker: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

class STDB extends Dexie {
  knownTickers!: Table<KnownTicker>;
  ticks!: Table<Tick>;
  constructor() {
    super("STDB");
    this.version(1).stores({
      ticks: "++id, timestamp, ticker",
      knownTickers: "id",
    });
  }
}

const db = new STDB();

export const tickDB = {
  add: async (tick: Tick) => await db.ticks.add(tick),
  bulkAdd: async (ticks: Tick[]) => await db.ticks.bulkAdd(ticks),
  delete: async (ticker: string) =>
    await db.ticks.where("ticker").equalsIgnoreCase(ticker).delete(),
  get: async (ticker: string) =>
    await db.ticks.where("ticker").equalsIgnoreCase(ticker).toArray(),
  getTickers: async () =>
    (await db.ticks.orderBy("ticker").uniqueKeys()).map((e) => e.toString()),
};

export const knownDB = {
  add: async (ticker: KnownTicker) => await db.knownTickers.add(ticker),
  bulkAdd: async (tickers: KnownTicker[]) =>
    await db.knownTickers.bulkAdd(tickers),
  delete: async (ticker: string) =>
    await db.knownTickers.where("ticker").equalsIgnoreCase(ticker).delete(),
  clear: async () => await db.knownTickers.clear(),
  get: async (ticker: string) =>
    await db.knownTickers.where("id").equalsIgnoreCase(ticker),
  getTickers: async () => (await db.knownTickers.toArray()).map((e) => e.id),
};
