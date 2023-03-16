import { hash } from 'bcryptjs'

import { PrismaUsersRepository } from './../repositories/prisma-users-repository'
import { prisma } from '@/lib/prisma'

interface IRegisterServiceRequest {
  name: string
  email: string
  password: string
}

export async function registerService({
  name,
  email,
  password,
}: IRegisterServiceRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({ where: { email } })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUserRepository = new PrismaUsersRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  })
}
