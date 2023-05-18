import { z } from "zod"
import prismaClient from "../../prisma"

const ListTablesService = {
  async execute() {

    try {
      const tables = await prismaClient.table.findMany()

      return tables

    } catch (err) {
      return err
    }

  }
}

export { ListTablesService }