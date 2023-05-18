import { z } from "zod"
import prismaClient from "../../prisma"

const ListTablesAndOrdersService = {
  async execute() {

    try {
      const tables = await prismaClient.table.findMany({
        include: {
          orders: {
            include: {
              items: true
            }
          }
        }
      })

      return tables

    } catch (err) {
      return err
    }

  }
}

export { ListTablesAndOrdersService }