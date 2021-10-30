import {Response, Request} from "express";
import { Product, productStore} from "../models/product";
import { v4 as uuid } from 'uuid'

const store: productStore = new productStore();


export const createProduct = async (req: Request, res: Response) => {

    const product: {id: number, name: string, price: number, category: string} = {
        id: Number(uuid()),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    const newProduct: Product = await store.create(product);
    res.json(newProduct)
}

export const productIndex = async (req: Request, res: Response) => {

    const product: Product[] = await store.index();
    res.json(product)
}

export const showProduct = async (req: Request, res: Response) => {
    const product: Product = await store.show(req.params.id);
    res.json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
    const product: Product = await store.update(req.params.id, req.body.price);
    res.json(product)
}

export const deleteProduct = async (req: Request, res: Response) => {
    const deletedProduct = await store.delete(req.params.id);
    if(!deletedProduct){
      return res.status(401).send({auth: false, message: "No product found!!"});
    }
    res.json(deletedProduct)
}

export const productsByCategory = async (req: Request, res: Response) => {
    const products: {name: string, price: number}[] = await store.productsByCategory(req.params.category);

    res.json(products)
}
