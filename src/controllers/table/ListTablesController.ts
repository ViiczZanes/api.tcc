import { Request, Response } from 'express';
import { ListTablesService } from '../../services/table/ListTablesService';


const ListTablesController = {
  async handle(req: Request, res: Response) {

    const response = await ListTablesService.execute()
    return res.json(response)
  }

}


export { ListTablesController }