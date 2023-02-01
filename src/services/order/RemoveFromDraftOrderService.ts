import { z } from "zod"
import prismaClient from "../../prisma"

const OrderSchema = z.string()

type OrderRequest = z.infer<typeof OrderSchema>


const RemoveFromDraftOrderService = {
  async execute(orderProps: OrderRequest) {
    const id = OrderSchema.parse(orderProps)

    try {
      const order = await prismaClient.order.update({
        where: {
          id
        },
        data: {
          draft: false,
        }
      })

      return order
    } catch (err) {
      return err
    }

  }
}

export { RemoveFromDraftOrderService }