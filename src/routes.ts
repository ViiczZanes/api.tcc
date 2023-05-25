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
import { ListAllCategoryAndProductsController } from "./controllers/category/ListAllCategoryAndProductsController";
import { ListUsersController } from "./controllers/user/ListUsersController";
import { UserInfoController } from "./controllers/user/UserInfoController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import Permission from "./middlewares/PermissionMiddleware";

import { CreateTableController } from "./controllers/table/CreateTableController";
import { DeleteTableController } from "./controllers/table/DeleteTableController";
import { ListTablesController } from "./controllers/table/ListTablesController";
import { ListTablesAndOrdersController } from "./controllers/table/ListTablesAndOrdersController";
import { DetailTableController } from "./controllers/table/DetailTableController";
import { ListTablesWithOpenOrdersController } from "./controllers/table/ListTablesWithOpenOrdersController";
import { CleanTableController } from "./controllers/table/CleanTableController";


const router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.json({
        ok: true
    })
})

router.post('/user/create', CreateUserController.handle);
router.post('/user/auth', AuthUserController.handle)
router.delete('/user/delete', Permission('admin'), DeleteUserController.handle)
router.get('/user/detail', AuthMiddleware, DetailUserController.handle)
router.get('/users', Permission('admin'), AuthMiddleware, ListUsersController.handle)
router.get('/user/info', AuthMiddleware, UserInfoController.handle)
router.put('/user/update', Permission('admin'), AuthMiddleware, UpdateUserController.handle)

router.post('/category/create', Permission('admin'), AuthMiddleware, CreateCategoryController.handle)
router.delete('/category/delete', Permission('admin'), AuthMiddleware, DeleteCategoryController.handle)
router.get('/category/list', Permission('admin', 'garcom'), AuthMiddleware, ListCategoryController.handle)
router.get('/category/products', Permission('admin'), ListAllCategoryAndProductsController.handle)

router.post('/product/create', Permission('admin'), AuthMiddleware, multer(multerConfig).single("file"), CreateProductController.handle)
router.delete('/product/delete', Permission('admin'), AuthMiddleware, DeleteProductController.handle)
router.get('/products', AuthMiddleware, ListProductByCategoryController.handle)
router.get('/products/all', ListAllCategoryAndProductsController.handle)

// // Rotas de Mesa
router.post('/table/create', Permission('admin'), AuthMiddleware, CreateTableController.handle); // Rota para criar uma nova mesa
router.get('/tables', AuthMiddleware, ListTablesController.handle); // Rota para listar todas as mesas
router.get('/tables/all', AuthMiddleware, ListTablesAndOrdersController.handle); // Rota para listar todas as mesas com seus respectivos pedidos
router.delete('/table/delete', Permission('admin'), AuthMiddleware, DeleteTableController.handle); // Rota para deletar uma mesa
router.get('/table/detail', AuthMiddleware, DetailTableController.handle); // Rota para obter detalhes de uma mesa
router.get('/tables/orders/open', ListTablesWithOpenOrdersController.handle)
router.put('/table/clean', CleanTableController.handle)


router.post('/order/create', Permission('admin', 'garcom'), AuthMiddleware, CreateOrderController.handle)
router.delete('/order/delete', Permission('admin', 'garcom'), AuthMiddleware, DeleteOrderController.handle)
router.put('/order/finish', AuthMiddleware, Permission('admin', 'cozinha'), FinishOrderController.handle)
router.put('/order/draft', Permission('admin', 'garcom'), AuthMiddleware, RemoveFromDraftOrderController.handle)
router.get('/order/detail', AuthMiddleware, DetailOrderController.handle)
router.get('/orders', AuthMiddleware, ListOrderController.handle)

router.post('/item/add', Permission('admin', 'garcom'), AuthMiddleware, AddItemController.handle)
router.delete('/item/remove', Permission('admin', 'garcom'), AuthMiddleware, RemoveItemController.handle)




router.get('/garcom-only', Permission('garcom', 'admin'), (req: Request, res: Response) => {
    res.send('Esta rota é acessível apenas para usuários com a função "garcom, ou Admin"');
});

export { router }