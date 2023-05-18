import { z } from "zod"
import prismaClient from "../../prisma"

const OrderSchema = z.string()


type OrderRequest = z.infer<typeof OrderSchema>

const CreateOrderService = {
  async execute(orderProps: OrderRequest) {
    const table_id = OrderSchema.parse(orderProps)

    try {
      const createdOrder = await prismaClient.order.create({
        data: {
          table_id
        }
      })

      return createdOrder
    } catch (err) {
      return err
    }

  }
}

export { CreateOrderService }