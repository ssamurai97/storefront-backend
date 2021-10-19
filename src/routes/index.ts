import express from 'express'
import {verifyAuthToken} from "../middleware/auth";
import {catchErrors} from "../lib/errorHandlers";
import { index, create, show} from "../handlers/user";
import {
    createProduct,
    deleteProduct,
    productIndex,
    productsByCategory,
    showProduct,
    updateProduct
} from "../handlers/products";
import {addProduct, createOrder, deleteOrder, orderIndex, showOrder} from "../handlers/orders";

const router = express.Router();

//Uer route
router.get('/users', verifyAuthToken, catchErrors(index));
router.get('/users/:id', verifyAuthToken, catchErrors(show));
router.post("/users", catchErrors(create));
//Product route
router.post('/products', verifyAuthToken, catchErrors(createProduct));
router.get('/products', catchErrors(productIndex))
router.get('/products/:id', showProduct)
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/category/:category', productsByCategory)

//Orders route
router.get('/orders/:id', catchErrors(showOrder));
router.get('/orders', catchErrors(orderIndex));
router.post('/orders', verifyAuthToken, catchErrors(createOrder));
router.post("/orders/:id/products", catchErrors(addProduct));
router.delete("/orders/:id", deleteOrder)
export default router

