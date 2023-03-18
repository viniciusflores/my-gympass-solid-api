import { CheckInService } from './check-in'
import { CheckInRepositoryMock } from './../repositories/mock/check-in-repository-mock'
import { describe, it, expect, beforeEach } from 'vitest'

let checkInsRepository: CheckInRepositoryMock
let sut: CheckInService

describe('Check In Service', () => {
  beforeEach(() => {
    checkInsRepository = new CheckInRepositoryMock()
    sut = new CheckInService(checkInsRepository)
  })

  it('should be possible to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
