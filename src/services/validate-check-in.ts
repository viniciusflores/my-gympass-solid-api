import { ResourceNotFoundError } from './errors/resource-not-found'
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface IValidateCheckInServiceRequest {
  checkInId: string
}

interface IValidateCheckInServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInServiceRequest): Promise<IValidateCheckInServiceResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
