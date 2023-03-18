import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UsersRepositoryMock } from '@/repositories/mock/users-repository-mock'
import { hash } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { AuthenticateService } from './authenticate'

describe('Authenticate Service', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new UsersRepositoryMock()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new UsersRepositoryMock()
    const sut = new AuthenticateService(usersRepository)

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong pass', async () => {
    const usersRepository = new UsersRepositoryMock()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
