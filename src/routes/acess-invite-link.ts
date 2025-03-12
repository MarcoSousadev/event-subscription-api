import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { env } from '../env'
import { acessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Acess invite link and redirects user',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await acessInviteLink({subscriberId})

      console.log(subscriberId)

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)
      
      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}