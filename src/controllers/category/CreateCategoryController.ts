import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';


const CreateCategoryController = {
  async handle(req: Request, res: Response) {

    const { name } = req.body

    const response = await CreateCategoryService.execute( name )
    return res.json(response)
  }
}

export { CreateCategoryController }