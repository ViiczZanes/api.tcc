import { Router, Request, Response } from "express";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";



const router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.json({
        ok: true
    })
})

router.post('/user/create', CreateUserController.handle);
router.post('/user/auth', AuthUserController.handle)
router.delete('/user/delete', DeleteUserController.handle)



export { router }