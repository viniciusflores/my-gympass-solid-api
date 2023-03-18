import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface ICheckInRequest {
  userId: string
  gymId: string
}

interface ICheckInResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkinRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: ICheckInRequest): Promise<ICheckInResponse> {
    const checkIn = await this.checkinRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
