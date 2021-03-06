import db from '../database'
import {Product} from "./product";

export interface Orders {
    id: number
    user_id: string
    status: string
}

export class OrderStore {

    async index(): Promise<Orders[]> {
        try {
            // @ts-ignore
            const conn = await db.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            conn.release();
            console.log(result.rows)
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Orders> {
        try {
            // @ts-ignore
            const conn = await db.connect();
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            console.log(result.rows[0])
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find orders ${id}. Error: ${err}`);
        }
    }


    async create(order: Orders):Promise<Orders>{
        try {
            // @ts-ignore
            const conn = await db.connect();
            const sql =
                "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
            const result = await conn.query(sql, [order.user_id, order.status]);
            const product = result.rows[0];

            conn.release();
            console.log(product)

            return product;
        } catch (err) {
            throw new Error(`Could not add new order ${order.user_id}. Error: ${err}`);
        }
    }


    async addProduct(
        quantity: number,
        orderId: string,
        productId: string
    ): Promise<Orders> {
        try {
            //@ts-ignore
            const conn = await db.connect();
            const sql =
                "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(
                `Could not add product ${productId} to order ${orderId}: ${err}`
            );
        }
    }

    async update(order: Orders): Promise<Orders>{
        try {
            // @ts-ignore
            const conn = await db.connect()
            const query = "UPDATE orders SET status = $1, user_id=($2) WHERE id = ($3)";

            const result = await conn.query(query, [order.status, order.user_id, order.id]);

            conn.release();
            return result.rows[0]
        }catch (err){
            throw new Error(`Could not find order ${order.id}. Error: ${err}`)
        }
    }

    async delete(id:string): Promise<Product>{
        try{
            // @ts-ignore
            const conn = await db.connect();

            const query =" DELETE FROM orders WHERE id=($1)"

            const result = await conn.query(query,  [id]);
            const product = result.rows[0];
            conn.release()
            return product
        }catch (err) {
            throw  new Error(`Could not delete Order ${id} Error: ${err}`)
        }
    }

}
