import { z } from "zod";
import prismaClient from "../../prisma";

const OrderSchema = z.object({
  status: z.boolean(),
  draft: z.boolean(),
});

const TableSchema = z.object({
  id: z.number(),
  name: z.string(),
  orders: z.array(OrderSchema),
});

const ListTablesWithOpenOrdersService = {
  async execute() {
    try {
      const tables = await prismaClient.table.findMany({
        include: {
          orders: {
            where: {
              status: true
            }
          }
        }
      });

      const tablesWithOpenOrders = tables.filter(table => table.orders.length > 0);

      return tablesWithOpenOrders;

    } catch (err) {
      return err;
    }
  },
};


export { ListTablesWithOpenOrdersService };
