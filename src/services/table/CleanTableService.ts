import prismaClient from "../../prisma"

const CleanTableService = {
  async execute(tableId: string) {
    try {
      // Deleta os registros associados à mesa específica usando o Prisma
      await prismaClient.order.deleteMany({
        where: {
          table_id: tableId
        }
      });

      // Retorna uma mensagem de sucesso
      return { message: "Registros deletados com sucesso." };
    } catch (err) {
      // Retorna um erro caso ocorra algum problema
      throw new Error("Erro ao deletar registros da mesa: " + err);
    }
  }
}

export { CleanTableService }