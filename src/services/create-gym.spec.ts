import { CreateGymService } from './create-gym'
import { expect, describe, it, beforeEach } from 'vitest'
import { GymsRepositoryMock } from '@/repositories/mock/gym-repository-mock'

let createGymsRepository: GymsRepositoryMock
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    createGymsRepository = new GymsRepositoryMock()
    sut = new CreateGymService(createGymsRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'JS Gym',
      description: '',
      phone: '',
      latitude: -29.6821417,
      longitude: -51.1279104,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
