import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';


const CreateOrderController = {
  async handle(req: Request, res: Response) {

    const { table } = req.body;

    const response = await CreateOrderService.execute(table)
    return res.json(response)
  }
}

export { CreateOrderController }