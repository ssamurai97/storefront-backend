
import db from '../database'


export interface Product{
    id: number
    name: string
    price: number
    category: string
}


export class productStore {
    async create(
        p: Product
    ):Promise<Product> {
        try {
            // @ts-ignore
        const conn = await db.connect()
        const sql = "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";

        const result = await conn.query(sql,[p.name, p.price, p.category]);
        conn.release()
        return result.rows[0];
    }catch (err){
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
        }
    }

    async index(): Promise<Product[]>{
        try{
            // @ts-ignore
            const conn = await db.connect();
            const sql = "SELECT * FROM products";

            const result = await conn.query(sql);
            conn.release()

            return result.rows
        }catch (err){
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Product>{

        try{
            // @ts-ignore
            const conn = await db.connect()

            const sql = "SELECT * FROM products WHERE id=($1)";

            const result = await conn.query(sql,[id])
            conn.release();
            return result.rows[0];
        }catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async update(id: string, price: number): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await db.connect();
            const sql = "UPDATE products SET price = $1 WHERE id = $2";
            const result = await conn.query(sql, [price, id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {

            // @ts-ignore
            const conn = await db.connect();
            const sql = "DELETE FROM products WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }

    async productsByCategory(
        category: string
    ): Promise<{ name: string; price: number }[]> {
        try {
            // @ts-ignore
            const conn = await db.connect();
            const sql = "SELECT name, price FROM products WHERE category=($1)";
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not find any product for ${category}. Error: ${err}`
            );
        }
    }


}
