import prismaClient from "../../prisma"

const ListUsersService = {
  async execute() {
    try {
      const users = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      })

      return users
    } catch (err) {
      return err
    }
  }
}

export { ListUsersService }