import prismaClient from "../../prisma"

const ListOrdersService = {
  async execute() {
    try {
      const orders = await prismaClient.order.findMany({
        where: {
          draft: false,
          status: false,
        },
        orderBy: {
          created_at: 'desc'
        }
      })

      return orders
    } catch (err) {
      return err
    }
  }
}

export { ListOrdersService }