import { z } from 'zod'
import prismaClient from '../../prisma'

const ProductSchema = z.string()

type ProductRequest = z.infer<typeof ProductSchema>

const ListProductByCategoryService = {
  async execute(categoryProps: ProductRequest) {
    const category_id = ProductSchema.parse(categoryProps)

    try {
      const products = await prismaClient.product.findMany({
        where: {
          category_id
        }
      })

      return products
    } catch (err) {
      return err
    }

  }
}

export { ListProductByCategoryService }