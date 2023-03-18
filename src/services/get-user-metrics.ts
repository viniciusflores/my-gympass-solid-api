import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface IGetUserMetricsResquest {
  userId: string
}

interface IGetUserMetricsRespose {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsResquest): Promise<IGetUserMetricsRespose> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
