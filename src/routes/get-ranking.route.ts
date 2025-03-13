import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberInviteCount } from '../functions/get-subscriber-invite-count'
import { getRaking } from '../functions/get-ranking'

export const getRakingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['referral'],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              }),
          )})
        }
      }
    },
    async request => {
     const { rakingWithScore } = await getRaking()
      return { 
        ranking: rakingWithScore
      }
    }
  )
}