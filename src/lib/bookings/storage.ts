// Dual-mode persistent storage:
//   • Production / Vercel: Upstash Redis (KV_REST_API_URL + KV_REST_API_TOKEN)
//   • Local dev fallback:   JSON file at .bookings-data.json
//
// Switches automatically based on env presence so the same code runs in both.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { Redis } from "@upstash/redis";

const STORAGE_KEY = "eeg_art_study_bookings_v1";

const HAS_KV =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis: Redis | null = HAS_KV
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

const FILE = resolve(process.cwd(), ".bookings-data.json");

export interface BookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  consent: boolean;
  ts: string; // ISO timestamp
}

// bookings structure: { "date|slotKey": BookingRecord[] }
export type BookingsState = Record<string, BookingRecord[]>;

export async function loadBookings(): Promise<BookingsState> {
  if (redis) {
    try {
      const data = await redis.get<string>(STORAGE_KEY);
      if (!data) return {};
      return typeof data === "string" ? JSON.parse(data) : data;
    } catch (e) {
      console.error("[bookings/storage] redis load failed:", e);
      return {};
    }
  }
  try {
    if (!existsSync(FILE)) return {};
    const parsed = JSON.parse(readFileSync(FILE, "utf-8"));
    return parsed || {};
  } catch (e) {
    console.error("[bookings/storage] file load failed:", e);
    return {};
  }
}

export async function saveBookings(bookings: BookingsState): Promise<void> {
  if (redis) {
    try {
      await redis.set(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error("[bookings/storage] redis save failed:", e);
    }
  } else {
    try {
      mkdirSync(dirname(FILE), { recursive: true });
      writeFileSync(FILE, JSON.stringify(bookings, null, 2), "utf-8");
    } catch (e) {
      console.error("[bookings/storage] file save failed:", e);
    }
  }
}
