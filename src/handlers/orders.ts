import { Request, Response} from "express";
import {Orders, OrderStore} from "../models/orders";
import { v4 as uuid } from "uuid";


const orderStore: OrderStore = new OrderStore()

export const createOrder = async (req: Request, res: Response) => {
    const order:{ user_id: string, status: string, id: number} = {
        id:  Number(uuid()),
        user_id: req.body.user_id,
        status: req.body.status
    };

    const newOrder: Orders = await orderStore.create(order)

    res.json(newOrder);
}

export const showOrder = async (req: Request, res: Response) => {
    const order: Orders = await  orderStore.show(req.params.id);
    res.json(order)
}

export const addProduct = async (req: Request, res: Response) => {

    const orderId: string = req.params.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
    const addedProduct = await orderStore.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
}

export const updateOrder = async (req: Request, res: Response) => {
    const order: Orders = await orderStore.update(req.params.id, req.params.status);
    res.json(order)
}

export const deleteOrder = async (req: Request, res: Response) => {
    const id = await orderStore.delete(req.params.id);

    res.json(id)
}

export const orderIndex = async (req: Request, res: Response) =>{
    const orders = await orderStore.index()
    res.json(orders)
}
