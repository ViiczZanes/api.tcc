import { Request, Response } from 'express';
import { CleanTableService } from '../../services/table/CleanTableService';
import { table } from 'console';


const CleanTableController = {
  async handle(req: Request, res: Response) {

    const { tableId } = req.body

    const response = await CleanTableService.execute(tableId)
    return res.json(response)
  }

}


export { CleanTableController }