import { z } from "zod"
import prismaClient from "../../prisma"

const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  image: z.string(),
  category_id: z.string(),
})

type CategoryRequest = z.infer<typeof productSchema>
const CreateProductService = {
  async execute(categoryProps: CategoryRequest) {
    const { name, price, description, image, category_id } = productSchema.parse(categoryProps)

    try {
      const createdProduct = await prismaClient.product.create({
        data: {
          name,
          price,
          description,
          image,
          category_id
        }
      })

      return createdProduct

    } catch (err) {
      return err
    }

  }
}

export { CreateProductService }