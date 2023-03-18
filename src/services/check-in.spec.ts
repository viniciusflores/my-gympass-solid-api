import { GymsRepositoryMock } from './../repositories/mock/gym-repository-mock'
import { CheckInService } from './check-in'
import { CheckInRepositoryMock } from './../repositories/mock/check-in-repository-mock'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: CheckInRepositoryMock
let gymsRepository: GymsRepositoryMock
let sut: CheckInService

describe('Check In Service', () => {
  beforeEach(async () => {
    checkInsRepository = new CheckInRepositoryMock()
    gymsRepository = new GymsRepositoryMock()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    vi.useFakeTimers()

    await gymsRepository.items.push({
      id: 'gym-01',
      title: 'JS Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be possible to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.6821417,
      userLongitude: -51.1279104,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('sould not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.6821417,
      userLongitude: -51.1279104,
    })

    console.log(checkIn.created_at)

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -29.6821417,
        userLongitude: -51.1279104,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('sould be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.6821417,
      userLongitude: -51.1279104,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.6821417,
      userLongitude: -51.1279104,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
