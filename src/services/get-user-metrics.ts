import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface IGetUserMetricsServiceResquest {
  userId: string
}

interface IGetUserMetricsServiceRespose {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsServiceResquest): Promise<IGetUserMetricsServiceRespose> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
