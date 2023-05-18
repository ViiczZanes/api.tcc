import { z } from "zod"
import prismaClient from "../../prisma"

const ProductSchema = z.string()
  .min(1, { message: "A Categoria Nao Pode Ter Nome Vazio" })
  .transform(name => name.toLocaleLowerCase())

type ProductRequest = z.infer<typeof ProductSchema>



const DeleteProductService = {
  async execute(categoryProps: ProductRequest) {
    const id = ProductSchema.parse(categoryProps)

    try {
      const deletedProduct = await prismaClient.product.delete({
        where: {
          id
        }
      })

      return deletedProduct
    } catch (err) {
      return err
    }

  }
}

export { DeleteProductService }