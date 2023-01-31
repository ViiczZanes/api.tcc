import { z } from 'zod'
import prismaClient from '../../prisma'

const CategorySchema = z.string()

type CategoryRequest = z.infer<typeof CategorySchema>

const DeleteCategoryService = {
  async execute(category_id: CategoryRequest) {
    const id = CategorySchema.parse(category_id)

    try {
      await prismaClient.category.delete({
        where: { id }
      })

    } catch (err) {
      return err
    }

  }
}

export { DeleteCategoryService }