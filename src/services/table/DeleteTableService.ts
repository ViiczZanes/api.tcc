import { z } from "zod"
import prismaClient from "../../prisma"

const TableSchema = z.string()
  .min(1, { message: "A Categoria Nao Pode Ter Nome Vazio" })
  .transform(name => name.toLocaleLowerCase())

type TableRequest = z.infer<typeof TableSchema>



const DeleteTableService = {
  async execute(TableProps: TableRequest) {
    const id = TableSchema.parse(TableProps)

    try {
      const deletedTable = await prismaClient.table.delete({
        where: {
          id
        }
      })

      return deletedTable
    } catch (err) {
      return err
    }

  }
}

export { DeleteTableService }