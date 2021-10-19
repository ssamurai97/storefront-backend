import bcrypt from 'bcrypt'
// @ts-ignore
import db from '../database'
export interface User{
    id: number
    first_name: string
    last_name: string
    password: string
}

export class UserStore{

    async index(): Promise<User[]>{
        try{
            const conn = await db.connect()
            const sql = "SELECT id,first_name, last_name FROM users";

            const result = await conn.query(sql);
            conn.release()
            return result.rows
        }catch (err){
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            // @ts-ignore
            const conn = await db.connect();
            const sql = "SELECT id, first_name, last_name FROM users WHERE id=($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User):Promise<User>{
        const saltRounds: string = process.env.SALT_ROUNDS as string;
        const pepper: string = process.env.BCRYPT_PASSWORD as string;
        try {
            // @ts-ignore
            const conn = await db.connect();
            const sql =
                "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
        }

    }
}
