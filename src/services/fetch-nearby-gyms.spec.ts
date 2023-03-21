import { GymsRepositoryMock } from '@/repositories/mock/gym-repository-mock'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchNearByGymsService } from './fetch-nearby-gyms'

let gymsRepository: GymsRepositoryMock
let sut: FetchNearByGymsService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new GymsRepositoryMock()
    sut = new FetchNearByGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -29.6821417,
      longitude: -51.1279104,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -30.0122214,
      longitude: -51.1555933,
    })

    const { gyms } = await sut.execute({
      userLatitude: -29.6821417,
      userLongitude: -51.1279104,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
