import { Prisma } from '@prisma/client'

export class UsersRepositoryMock {
  public users: any[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = await this.users.push(data)

    return user
  }
}
