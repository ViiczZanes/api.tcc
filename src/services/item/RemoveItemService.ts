import { z } from "zod"
import prismaClient from "../../prisma"

const ItemSchema = z.string()

type ItemRequest = z.infer<typeof ItemSchema>

const RemoveItemService = {
  async execute(itemProps: ItemRequest) {
    const id = ItemSchema.parse(itemProps)

    const item = await prismaClient.item.delete({
      where: {
        id
      }
    })

    return item

  }
}

export { RemoveItemService }