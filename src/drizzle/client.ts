import postgres from 'postgres'
import { env } from '../env'
import { drizzle } from "drizzle-orm/postgres-js";
import { subscriptions } from "./schema/subscriptions"
import SubscriptionSet from 'ioredis/built/SubscriptionSet';

export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, { 
  schema: {
    subscriptions,
  }
})
