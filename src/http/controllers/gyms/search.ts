import { makeSearchGymService } from '@/services/factories/make-search-gym-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(request.params)

  const searchGymService = makeSearchGymService()
  const { gyms } = await searchGymService.execute({
    query: q,
    page,
  })

  return reply.status(200).send({ gyms })
}
