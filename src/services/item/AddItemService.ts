import { z } from "zod"
import prismaClient from "../../prisma"

const ItemSchema = z.object({
  order_id: z.string(),
  product_id: z.string(),
  amount: z.number(),
})


type ItemRequest = z.infer<typeof ItemSchema>

const AddItemService = {

  async execute(itemProps: ItemRequest) {
    const { product_id, order_id, amount } = ItemSchema.parse(itemProps)

    try {
      const itemAdded = await prismaClient.item.create({
        data: {
          order_id,
          product_id,
          amount
        }
      })

      return itemAdded
    } catch (err) {
      return err
    }

  }
}

export { AddItemService }