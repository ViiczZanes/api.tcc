import { z } from "zod"
import prismaClient from "../../prisma"

const TableSchema = z.number()

type TableRequest = z.infer<typeof TableSchema>
const CreateTableService = {
  async execute(tableNumber: TableRequest) {
    const number = TableSchema.parse(tableNumber)

    const tableAlreadyExists = await prismaClient.table.findFirst({
      where: {
        number
      }
    })

    if (tableAlreadyExists) throw new Error('Mesa já Cadastrada')

      const table = await prismaClient.table.create({
        data: {
          number
        }
      })

      return table

  }
}

export { CreateTableService }