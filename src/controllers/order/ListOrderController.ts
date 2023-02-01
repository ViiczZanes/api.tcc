import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';

const ListOrderController = {
  async handle(req: Request, res: Response) {

    const response = await ListOrdersService.execute()
    return res.json(response)
  }
}

export { ListOrderController }