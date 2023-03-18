import { GetUserMetricsService } from './get-user-metrics'
import { CheckInRepositoryMock } from './../repositories/mock/check-in-repository-mock'
import { describe, it, expect, beforeEach } from 'vitest'

let checkInsRepository: CheckInRepositoryMock
let sut: GetUserMetricsService

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new CheckInRepositoryMock()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
