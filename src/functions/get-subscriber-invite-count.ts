import { redis } from "../redis/client"

interface  getSubscriberInviteCountParams {
  subscriberId: string
}

export async function getSubscriberInviteCount({subscriberId}:getSubscriberInviteCountParams) {

  // await redis.hincrby('referral:acess-count', subscriberId, 1)
  const count = await redis.zscore('referral:ranking', subscriberId)

  return {count: count ? Number.parseInt(count) : 0 }
}