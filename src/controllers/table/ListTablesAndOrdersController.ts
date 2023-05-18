import { Request, Response } from 'express';
import { ListTablesAndOrdersService } from '../../services/table/ListTablesAndOrdersService';



const ListTablesAndOrdersController = {
  async handle(req: Request, res: Response) {

    const response = await ListTablesAndOrdersService.execute()
    return res.json(response)
  }

}


export { ListTablesAndOrdersController }