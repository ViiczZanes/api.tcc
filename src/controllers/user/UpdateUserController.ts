import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/UpdateUserService';
const UpdateUserController = {
  async handle(req: Request, res: Response) {
      const { id, name, email, role, newPassword } = req.body

    const response = await UpdateUserService.execute({ id, name, email, role, newPassword })
    return res.json(response)
  }
}

export { UpdateUserController }