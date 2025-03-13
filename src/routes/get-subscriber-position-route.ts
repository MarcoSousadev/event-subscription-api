import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberInviteCount } from '../functions/get-subscriber-invite-count'
import { getSubscriberRankingPosition } from '../functions/get-susbcriber-ranking-position'

export const getSubscriberPositionRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscriber/:subscriberId/ranking/count',
    {
      schema: {
        summary: 'Get subscriber ranking position ',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable()
          })
        }
      }
    },
    async request => {

      const { subscriberId } = request.params

      const { position } = await getSubscriberRankingPosition({subscriberId})

      return { position }
    }
  )
}