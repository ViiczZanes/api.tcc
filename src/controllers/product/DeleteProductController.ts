import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/product/DeleteProductService';

const DeleteProductController = {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;

    const response = await DeleteProductService.execute(product_id)
    return res.json(response)
  }
}

export { DeleteProductController }