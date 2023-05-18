import { z } from "zod"
import prismaClient from "../../prisma"

const OrderSchema = z.string()

type OrderRequest = z.infer<typeof OrderSchema>

const DetailOrderService = {
  async execute(orderProps: OrderRequest) {
    const order_id = OrderSchema.parse(orderProps)

    try {
      const orders = await prismaClient.item.findMany({
        where: {
          order_id
        },
        include: {
          product: true,
          order: {
            include: {
              Table: {
                select: {
                  number: true
                }
              }
            }
          },
        }
      })

      return orders
    } catch (err) {
      return err
    }


  }
}

export { DetailOrderService }