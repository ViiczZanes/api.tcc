import { Request, Response } from 'express';
import { ListAllCategoryAndProductsService } from '../../services/category/ListAllCategoryAndProductsService';
const ListAllCategoryAndProductsController = {
  async handle(req: Request, res: Response) {


    const response = await ListAllCategoryAndProductsService.execute()
    return res.json(response)
  }
}

export { ListAllCategoryAndProductsController }