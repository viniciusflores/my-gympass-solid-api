import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class GymsRepositoryMock implements GymsRepository {
  public items: Gym[] = []

  findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
