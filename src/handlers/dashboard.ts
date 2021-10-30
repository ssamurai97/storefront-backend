import { Request, Response} from "express";
import { Dashboard} from "../services/dashboard";

export const dashboard = new Dashboard()

 export const fiveMostExpensive = async (req: Request, res: Response) => {
    const products = await dashboard.fiveMostExpensive();
    res.json(products);
};

 export const usersWithOrders = async (req: Request, res: Response) => {
    const users = await dashboard.usersWithOrders();
    res.json(users);
};

export const productsOrders = async (req: Request, res: Response) => {
    const products = await dashboard.productsOrders();
    res.json(products);
};

 export const completedOrders = async (req: Request, res: Response) => {
    const orders = await dashboard.completedOrders(req.params.id);
    res.json(orders);
};

 export const activeOrders = async (req: Request, res: Response) => {
    const orders = await dashboard.activeOrders(req.params.id);
    res.json(orders);
};

