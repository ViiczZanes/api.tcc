import { z } from "zod"
import prismaClient from "../../prisma"

const OrderSchema = z.number()


type OrderRequest = z.infer<typeof OrderSchema>

const CreateOrderService = {
  async execute(orderProps: OrderRequest) {
    const table = OrderSchema.parse(orderProps)

    try {
      const createdOrder = await prismaClient.order.create({
        data: {
          table
        }
      })

      return createdOrder
    } catch (err) {
      return err
    }

  }
}

export { CreateOrderService }