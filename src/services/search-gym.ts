import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface IsearchGymServiceRequest {
  query: string
  page: number
}

interface ISerachGymResponse {
  gyms: Gym[]
}

export class SearchGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: IsearchGymServiceRequest): Promise<ISerachGymResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
