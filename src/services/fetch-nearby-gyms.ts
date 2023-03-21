import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface IFetchNearByGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearByGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNearByGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearByGymsServiceRequest): Promise<IFetchNearByGymsServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
