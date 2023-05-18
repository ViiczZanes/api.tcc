import { Request, Response } from 'express';
import { ListTablesWithOpenOrdersService } from '../../services/table/ListTablesWithOpenOrdersService';


const ListTablesWithOpenOrdersController = {
  async handle(req: Request, res: Response) {

    const response = await ListTablesWithOpenOrdersService.execute()
    return res.json(response)
  }

}


export { ListTablesWithOpenOrdersController }