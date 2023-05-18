import { z } from "zod"
import prismaClient from "../../prisma"

const OrderSchema = z.string()

type OrderRequest = z.infer<typeof OrderSchema>

const DeleteOrderService = {
  async execute(orderProps: OrderRequest) {
    const id = OrderSchema.parse(orderProps)

    try {
      const deletedOrder = await prismaClient.order.delete({
        where: { id }
      })

      return deletedOrder

    } catch (err) {
      return err
    }
  }
}

export { DeleteOrderService }