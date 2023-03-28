import { FetchNearByGymsService } from './../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearByGymsService = new FetchNearByGymsService(gymsRepository)
  return fetchNearByGymsService
}
