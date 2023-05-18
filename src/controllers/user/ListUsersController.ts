import { Request, Response } from 'express';
import { ListUsersService } from '../../services/user/ListUsersService';
const ListUsersController = {
  async handle(req: Request, res: Response) {


    const response = await ListUsersService.execute()
    return res.json(response)
  }
}

export { ListUsersController }