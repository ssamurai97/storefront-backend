import express from 'express'
import bodyParser from 'body-parser'



const app = express()


const PORT = process.env.PORT || 3000

app.use(bodyParser.json())



app.listen(PORT,() => {
   console.log(`Express sever is running on port: ${PORT}`)
})


export default app
