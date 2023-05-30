import { z } from "zod"
import prismaClient from "../../prisma"

const OrderSchema = z.object({
  table_id: z.string(),
  user_id: z.string()
})


type OrderRequest = z.infer<typeof OrderSchema>

const CreateOrderService = {
  async execute(orderProps: OrderRequest) {
    const { table_id, user_id } = OrderSchema.parse(orderProps)

    console.log(table_id)
    try {
      const createdOrder = await prismaClient.order.create({
        data: {
          user_id,
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