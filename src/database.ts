import dotenv from 'dotenv'
import {Pool } from 'pg'




dotenv.config()


const {

POSTGRES_HOST,
POSTGRES_USER,
POSTGRES_TEST_DB,
POSTGRES_DB,
POSTGRES_PASSWORD,
MODE,
POSTGRES_PORT
} = process.env



let db: any

if(MODE=== 'dev'){
   db = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT)
   })
}

if(MODE === 'test'){
   db = new Pool({
     host: POSTGRES_HOST,
     database: POSTGRES_TEST_DB,
     user: POSTGRES_USER,
     password: POSTGRES_PASSWORD,
     port: Number(POSTGRES_PORT)
   })

}


export default db 
