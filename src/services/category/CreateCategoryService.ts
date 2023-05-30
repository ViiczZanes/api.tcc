import { z } from 'zod'
import prismaClient from '../../prisma'

const CategorySchema = z.string()
  .min(1, { message: "A Categoria Nao Pode Ter Nome Vazio" })
  .transform(name => name.toLocaleLowerCase())

type CategoryRequest = z.infer<typeof CategorySchema>


const CreateCategoryService = {
  async execute(name: CategoryRequest) {
    const categoryName = CategorySchema.parse(name)

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: categoryName
      }
    })

    if (categoryAlreadyExists) throw new Error('Categoria já Cadastrado')


    const createdCategory = await prismaClient.category.create({
      data: {
        name: categoryName
      }
    })

    return createdCategory
  }
}

export { CreateCategoryService }