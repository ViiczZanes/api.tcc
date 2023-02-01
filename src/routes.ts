import { Router, Request, Response } from "express";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import AuthMiddleware from "./middlewares/AuthMiddleware"
import multer from 'multer'
import multerConfig from './config/multer'
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { AddItemController } from "./controllers/item/AddItemController";
import { RemoveItemController } from "./controllers/item/RemoveItemController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { RemoveFromDraftOrderController } from "./controllers/order/RemoveFromDraftOrderController";


const router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.json({
        ok: true
    })
})

router.post('/user/create', CreateUserController.handle);
router.post('/user/auth', AuthUserController.handle)
router.delete('/user/delete', DeleteUserController.handle)
router.get('/user/detail', AuthMiddleware, DetailUserController.handle)

router.post('/category/create', AuthMiddleware, CreateCategoryController.handle)
router.delete('/category/delete', AuthMiddleware, DeleteCategoryController.handle)
router.get('/category/list', AuthMiddleware, ListCategoryController.handle)

router.post('/product/create', AuthMiddleware, multer(multerConfig).single("file"), CreateProductController.handle)
router.delete('/product/delete', AuthMiddleware, DeleteProductController.handle)
router.get('/products', AuthMiddleware, ListProductByCategoryController.handle)

router.post('/order/create', AuthMiddleware, CreateOrderController.handle)
router.delete('/order/delete', AuthMiddleware, DeleteOrderController.handle)
router.post('/order/finish', AuthMiddleware, FinishOrderController.handle)
router.post('/order/draft', AuthMiddleware, RemoveFromDraftOrderController.handle)
router.get('/order/detail', AuthMiddleware, DetailOrderController.handle)
router.get('/orders', AuthMiddleware, ListOrderController.handle)

router.post('/item/add', AuthMiddleware, AddItemController.handle)
router.delete('/item/remove', AuthMiddleware, RemoveItemController.handle)
export { router }