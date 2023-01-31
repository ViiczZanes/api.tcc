import prismaClient from "../../prisma"


type UserRequest = {
  user_id: string
}

const DeleteUserService = {
  async execute({ user_id }: UserRequest) {


    await prismaClient.user.delete({
      where: {
        id: user_id
      }
    })
    return
  }
}

export { DeleteUserService }