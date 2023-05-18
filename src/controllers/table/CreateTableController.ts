import { Request, Response } from 'express';
import { CreateTableService } from '../../services/table/CreateTableService';


const CreateTableController = {
  async handle(req: Request, res: Response) {

    const { number } = req.body

    const response = await CreateTableService.execute(number)
    return res.json(response)
  }

}


export { CreateTableController }