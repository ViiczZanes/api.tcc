import { Request, Response } from 'express';
import { DeleteCategoryService } from '../../services/category/DeleteCategoryService';


const DeleteCategoryController = {
  async handle(req: Request, res: Response) {

    const category_id = req.query.category_id as string;

    const response = await DeleteCategoryService.execute(category_id)
    return res.json(response)
  }
}

export { DeleteCategoryController }