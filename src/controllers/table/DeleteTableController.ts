import { Request, Response } from 'express';
import { DeleteTableService } from '../../services/table/DeleteTableService';

const DeleteTableController = {
  async handle(req: Request, res: Response) {
    const table_id = req.query.table_id as string;

    const response = await DeleteTableService.execute(table_id)
    return res.json(response)
  }
}

export { DeleteTableController }