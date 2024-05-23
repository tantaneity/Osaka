require('dotenv').config()
import cors from 'cors'
import express from 'express'
import 'reflect-metadata'
import cookieParser from 'cookie-parser'
import UserRouter from './src/routes/UserRouter'
import { AppDataSource } from './src/config/data-source'
import { errorMiddleware } from './src/middlewares/error-middleware'
import ProductRouter from './src/routes/ProductRouter'
import CategoryRouter from './src/routes/CategoryRouter'
import ReviewRouter from './src/routes/ReviewRouter'
import AdminRouter from './src/routes/AdminRouter'
import CartRouter from './src/routes/CartRouter'
import SellsRouter from './src/routes/SellsRouter'
import OrderRouter from './src/routes/OrderRouter'
import PageRouter from './src/routes/PageRouter'
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api/users', UserRouter)
app.use('/api/admin', AdminRouter)
app.use('/api/drinks', ProductRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/sells', SellsRouter)
app.use('/api/reviews', ReviewRouter)
app.use('/api/cart', CartRouter)
app.use('/api/orders', OrderRouter)
app.use('/api/pages', PageRouter)
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Meow').json()
})



const start = async () => {
    try {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()
        app.listen(PORT, () => console.log(`App is started on port ${PORT}\nhttp://localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
