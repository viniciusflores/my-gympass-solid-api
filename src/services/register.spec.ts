import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { UsersRepositoryMock } from '@/repositories/mock/users-repository-mock'
import { RegisterService } from './register'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepositoryMock = new UsersRepositoryMock()
    const registerService = new RegisterService(usersRepositoryMock)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepositoryMock = new UsersRepositoryMock()
    const registerService = new RegisterService(usersRepositoryMock)

    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepositoryMock = new UsersRepositoryMock()
    const registerService = new RegisterService(usersRepositoryMock)

    const email = 'johndoe@example.com'

    await registerService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
