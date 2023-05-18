import { Request, Response } from 'express';
import { UserInfoService } from '../../services/user/UserInfoService';
const UserInfoController = {
  async handle(req: Request, res: Response) {
    const id = req.query.user_id
    const response = await UserInfoService.execute(id as string)
    return res.json(response)
  }
}

export { UserInfoController }