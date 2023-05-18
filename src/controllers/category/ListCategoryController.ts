import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/category/ListCategoryService';
const ListCategoryController = {
  async handle(req: Request, res: Response) {

    const response = await ListCategoryService.execute()
    return res.json(response)
  }
}

export { ListCategoryController }