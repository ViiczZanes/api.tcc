import prismaClient from "../../prisma"


const UserInfoService = {
  async execute(id: string) {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          id
        },
        select: {
          id: true,
          email: true,
          name:true,
          role:true,       
        }
      })
      console.log(user)
      return user
    } catch (err) {
      
    }
  }
}

export { UserInfoService }