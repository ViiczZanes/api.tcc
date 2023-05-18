import prismaClient from "../../prisma"

const ListCategoryService = {
  async execute() {
    try {
      const categories = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true
        }
      })

      return categories

    } catch (err) {
      return err
    }
  }
}

export { ListCategoryService }