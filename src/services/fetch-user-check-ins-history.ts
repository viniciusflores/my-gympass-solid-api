import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface IFetchUserCheckInsHistoryServiceResquest {
  userId: string
  page: number
}

interface IFetchUserCheckInsHistoryServiceRespose {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryServiceResquest): Promise<IFetchUserCheckInsHistoryServiceRespose> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
