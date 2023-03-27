import { SearchGymService } from './search-gym'
import { GymsRepositoryMock } from '@/repositories/mock/gym-repository-mock'
import { describe, it, expect, beforeEach } from 'vitest'

let gymsRepository: GymsRepositoryMock
let sut: SearchGymService

describe('Search Gym Service', () => {
  beforeEach(async () => {
    gymsRepository = new GymsRepositoryMock()
    sut = new SearchGymService(gymsRepository)
  })

  it('should be able to fetch check in history', async () => {
    await gymsRepository.create({
      title: 'JS Gym',
      description: '',
      phone: '',
      latitude: -29.6821417,
      longitude: -51.1279104,
    })

    await gymsRepository.create({
      title: 'TS Gym',
      description: '',
      phone: '',
      latitude: -29.6821417,
      longitude: -51.1279104,
    })

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Gym' })])
  })

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS Gym : ${i}`,
        description: '',
        phone: '',
        latitude: -29.6821417,
        longitude: -51.1279104,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS Gym : 21' }),
      expect.objectContaining({ title: 'JS Gym : 22' }),
    ])
  })
})
