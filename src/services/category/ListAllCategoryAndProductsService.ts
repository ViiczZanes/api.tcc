import prismaClient from "../../prisma"

const ListAllCategoryAndProductsService = {
  async execute() {
    try {
      const categories = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true,
          products: true
        }
      })

      return categories

    } catch (err) {
      return err
    }
  }
}

export { ListAllCategoryAndProductsService }