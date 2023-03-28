import { PrismaGymsRepository } from './../../repositories/prisma/prisma-gyms-repository'
import { SearchGymService } from '../search-gym'

export function makeSearchGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymService = new SearchGymService(gymsRepository)
  return searchGymService
}
