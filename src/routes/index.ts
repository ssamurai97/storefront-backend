import express from 'express'
import {verifyAuthToken} from "../middleware/auth";
import {catchErrors} from "../lib/errorHandlers";
import {index, create, show, authenticate} from "../handlers/user";
import {
    createProduct,
    deleteProduct,
    productIndex,
    productsByCategory,
    showProduct,
    updateProduct
} from "../handlers/products";
import {addProduct,
    createOrder,
    deleteOrder, orderIndex,
    showOrder, updateOrder} from "../handlers/orders";
import {activeOrders, completedOrders, fiveMostExpensive, usersWithOrders} from "../handlers/dashboard";

const router = express.Router();


//--------------------------------------------------------------
//Uer route
//--------------------------------------------------------------
router.get('/users', verifyAuthToken, catchErrors(index));
router.get('/users/:id', verifyAuthToken, catchErrors(show));
router.post("/users", catchErrors(create));
router.post("/users/authenticate", authenticate)
//========================================================================
//Product route
//========================================================================
router.post('/products', verifyAuthToken, catchErrors(createProduct));
router.get('/products', catchErrors(productIndex))
router.get('/products/:id', showProduct)
router.put('/products/:id',verifyAuthToken, updateProduct);
router.delete('/products/:id',verifyAuthToken, deleteProduct);
router.get('/products/category/:category', productsByCategory)

//---------------------------------------------------------------------
//Orders route
//---------------------------------------------------------------------
router.get('/orders/:id', catchErrors(showOrder));
router.get('/orders', catchErrors(orderIndex));
router.post('/orders', verifyAuthToken, catchErrors(createOrder));
router.post("/orders/:id/products", catchErrors(addProduct));
router.put("/orders/:id", catchErrors(updateOrder))
router.delete("/orders/:id", deleteOrder)
//----------------------------------------------------------------------
// Dashboard routes
//----------------------------------------------------------------------
router.get ('/five-most-expensive', fiveMostExpensive);
router.get('/users-with-orders', usersWithOrders);
router.get('/users/:id/orders/active', verifyAuthToken, activeOrders)
router.get('/users/:id/orders/completed', verifyAuthToken, completedOrders)


export default router

