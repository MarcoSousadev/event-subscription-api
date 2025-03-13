import { inArray, name } from "drizzle-orm";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";
import { object } from "zod";
import { db } from "../drizzle/client";

export async function getRaking() {
  
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const susbcriberIdAndScore: Record<string, number> = {
    
  }

  for (let i = 0; i < ranking.length; i += 2) {
    susbcriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }
  
  const subscribers = await db.select().from(subscriptions).where(inArray(subscriptions.id, Object.keys(susbcriberIdAndScore)))

  const rakingWithScore = subscribers.map(subscriber => {
    
    return {
    id: subscriber.id,
    name: subscriber.name,
    score: susbcriberIdAndScore[subscriber.id]
    }
  })
  .sort((sub1, sub2)=> {
    return sub1.score - sub2.score
  })

  return {
    rakingWithScore
  }
 
}