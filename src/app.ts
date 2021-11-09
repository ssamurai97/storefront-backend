import express,{Response, Request} from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index'
import chalk from 'chalk'
const app = express()


const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.get('/', (req: Request, res: Response) => {

    const message = 'ヨコソ セイカイ ヘ'
	res.send(message)
})

app.use('/', routes)

app.listen(PORT,() => {
   console.log(`Express sever is running on port: ${chalk.green(PORT)}`)
})


export default app
