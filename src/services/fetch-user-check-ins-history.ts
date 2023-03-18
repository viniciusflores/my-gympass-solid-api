import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface IFetchUserCheckInsHistoryResquest {
  userId: string
  page: number
}

interface IFetchUserCheckInsHistoryRespose {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryResquest): Promise<IFetchUserCheckInsHistoryRespose> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
