import { describe, it, expect, beforeEach } from 'vitest'
import { ValidateCheckInService } from './validate-check-in'
import { CheckInRepositoryMock } from '@/repositories/mock/check-in-repository-mock'
import { ResourceNotFoundError } from './errors/resource-not-found'

let checkInsRepository: CheckInRepositoryMock
let sut: ValidateCheckInService

describe('Validate Check In Service', () => {
  beforeEach(async () => {
    checkInsRepository = new CheckInRepositoryMock()
    sut = new ValidateCheckInService(checkInsRepository)
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistance check-in', async () => {
    expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
