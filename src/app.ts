import express,{Response, Request} from 'express'
import bodyParser from 'body-parser'



const app = express()


const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.get('/', (req: Request, res: Response) => {

        const message = 'セイカイ ヨコソ'
	res.send(message)
})



app.listen(PORT,() => {
   console.log(`Express sever is running on port: ${PORT}`)
})


export default app
