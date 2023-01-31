import { z } from 'zod'
import prismaClient from '../../prisma'

const CategorySchema = z.string()
  .min(1, { message: "A Categoria Nao Pode Ter Nome Vazio" })
  .transform(name => name.toLocaleLowerCase())

type CategoryRequest = z.infer<typeof CategorySchema>


const CreateCategoryService = {
  async execute(name: CategoryRequest) {
    const categoryName = CategorySchema.parse(name)

    try {
      const createdCategory = await prismaClient.category.create({
        data: {
          name: categoryName
        }
      })

      return createdCategory
    } catch (err) {
      return err
    }

  }
}

export { CreateCategoryService }