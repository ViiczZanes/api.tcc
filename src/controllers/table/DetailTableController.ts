import { Request, Response } from 'express';
import { DetailTableService } from '../../services/table/DetailTableService';



const DetailTableController = {
  async handle(req: Request, res: Response) {
    const table_id = req.query.table_id as string

    const response = await DetailTableService.execute(table_id)
    return res.json(response)
  }
}

export { DetailTableController }