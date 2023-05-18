import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';


const CreateOrderController = {
  async handle(req: Request, res: Response) {

    const { table_id } = req.body;

    const response = await CreateOrderService.execute(table_id)
    return res.json(response)
  }
}

export { CreateOrderController }