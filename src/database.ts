import dotenv from 'dotenv'
import {Pool } from 'pg'

dotenv.config()

const {
POSTGRES_HOST,
POSTGRES_USER,
POSTGRES_TEST_DB,
POSTGRES_DB,
POSTGRES_PASSWORD,
ENV,
POSTGRES_PORT
} = process.env



const db = new Pool({
      host: POSTGRES_HOST,
      database: ENV === 'dev'? POSTGRES_DB : POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT)
   })

export default db 
