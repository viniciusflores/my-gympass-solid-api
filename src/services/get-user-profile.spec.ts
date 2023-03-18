import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { UsersRepositoryMock } from '@/repositories/mock/users-repository-mock'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let usersRepository: UsersRepositoryMock
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual('johndoe@example.com')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ userId: 'not-valid-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
