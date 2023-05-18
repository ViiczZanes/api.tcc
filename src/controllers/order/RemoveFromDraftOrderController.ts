import { Request, Response } from 'express';
import { RemoveFromDraftOrderService } from '../../services/order/RemoveFromDraftOrderService';


const RemoveFromDraftOrderController = {
  async handle(req: Request, res: Response) {

    const { order_id } = req.body 

    const response = await RemoveFromDraftOrderService.execute(order_id)
    return res.json(response)
  }
}

export { RemoveFromDraftOrderController }