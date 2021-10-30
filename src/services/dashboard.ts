import db from '../database'


export class Dashboard {

    async fiveMostExpensive(): Promise<{name: string, price: number}[]>{
        try{
            const conn = await db.connect();

            const query = "SELECT * FROM products ORDER BY price DESC LIMIT 5";

            const result = await conn.query(query)

            conn.release()
            console.log(Object.entries(result.rows))
            return result.rows
        }catch (err){
            throw new Error(`Unable to get Products by price, Error: ${err}`)
        }

    }

    // @ts-ignore
    async usersWithOrders(): Promise<{ first_name: string , last_name: string }[]>{
        try{
            const conn = await db.connect();
            const query = "SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id";
            const result = await db.query(query);
            conn.release();
            return result.rows
        }catch (err){

        }
    }
    async productsOrders(): Promise<{ name: string, price: number, order_id: string }[]>{
        try{
            const conn = await db.connect();
            const query = "SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_prducts_id";
            const result = await conn.query(query)
            return result.rows;
        }catch (err){
            throw  new Error(`Unable to get products and orders. Error: ${err}`)
        }
    }

    async completedOrders(id: string):Promise<{ }>{
        try{
            const conn = await db.connect();

            const query =
                "SELECT order_id, user_id, product_id, quantity, status FROM order_products INNER JOIN orders ON orders.id = order_products.order_id WHERE status='complete' AND orders.user_id =($1) ";
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }catch (err){
            throw new Error(`No completed orders found ${id} Error: ${err}`)
        }
    }
    //Get active Orders
    async activeOrders(id: string): Promise<{  }>{
        try{
            const conn = await  db.connect();

            const query =
                "SELECT order_id, user_id, product_id, quantity, status FROM order_products INNER JOIN orders  ON orders.id = order_products.id WHERE  status='active' AND orders.id=($1)";

            const result = await conn.query(query, [id]);

            conn.release();

            return result.rows;
        }catch (err){
            throw new Error(`Could not find active orders ${id}, Error: ${err}`)
        }
    }
}
