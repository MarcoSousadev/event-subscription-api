import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"
import { redis } from "../redis/client"

interface  getSubscriberInviteClicksParams {
  subscriberId: string
}

export async function getSubscriberInviteClicks({subscriberId}:getSubscriberInviteClicksParams) {

  // await redis.hincrby('referral:acess-count', subscriberId, 1)
  const count = await redis.hget('referral:acess-count', subscriberId)

  return {count: count ? Number.parseInt(count) : 0 }
}