import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/item/RemoveItemService';

const RemoveItemController = {
  async handle(req: Request, res: Response) {

    const item_id = req.query.item_id as string

    const response = await RemoveItemService.execute(item_id)
    return res.json(response)
  }
}

export { RemoveItemController }