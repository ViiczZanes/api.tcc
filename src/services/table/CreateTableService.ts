import { z } from "zod"
import prismaClient from "../../prisma"

const TableSchema = z.number()

type TableRequest = z.infer<typeof TableSchema>
const CreateTableService = {
  async execute(tableNumber: TableRequest) {
    const number = TableSchema.parse(tableNumber)

    try {
      const table = await prismaClient.table.create({
        data: {
          number
        }
      })

      return table

    } catch (err) {
      return err
    }

  }
}

export { CreateTableService }