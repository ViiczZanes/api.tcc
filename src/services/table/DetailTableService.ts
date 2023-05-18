// import { z } from "zod"
// import prismaClient from "../../prisma"

// const TableSchema = z.string()

// type TableRequest = z.infer<typeof TableSchema>

// const DetailTableService = {
//   async execute(tableProps: TableRequest) {
//     const table_id = TableSchema.parse(tableProps)

//     try {
//       const table = await prismaClient.table.findFirst({
//         where: {
//           id: table_id
//         },
//         include: {
//           orders: {
//             include: {
//               items: {
//                 include: {
//                   product: true
//                 }
//               },

//             }
//           }
//         }
//       })

//       return table
//     } catch (err) {
//       return err
//     }


//   }
// }

// export { DetailTableService }

import { z } from "zod";
import prismaClient from "../../prisma";

const TableSchema = z.string();

type TableRequest = z.infer<typeof TableSchema>;

const DetailTableService = {
  async execute(tableProps: TableRequest) {
    const table_id = TableSchema.parse(tableProps);

    try {
      const table = await prismaClient.table.findFirst({
        where: {
          id: table_id
        },
        include: {
          orders: {
            where: {
              items: {
                some: {} // Condição para verificar se items existe
              }
            },
            include: {
              items: {
                include: {
                  product: true
                }
              }
            }
          }
        }
      });

      return table;
    } catch (err) {
      return err;
    }
  }
};

export { DetailTableService };