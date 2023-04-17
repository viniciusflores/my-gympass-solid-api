import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetrics = makeGetUserMetricsService()
  const { checkInsCount } = await getUserMetrics.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
