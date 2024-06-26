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
import HomePageBannerRouter from './src/routes/HomePageBannerRouter'
import NewsRouter from './src/routes/NewsRouter'
import WishlistItemRouter from './src/routes/WishlistItemRouter'
import ImageRouter from './src/routes/ImageRouter'
import bodyParser from 'body-parser'
const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}))

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/api/users', UserRouter)
app.use('/api/admins', AdminRouter)
app.use('/api/drinks', ProductRouter)
app.use('/api/images', ImageRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/sells', SellsRouter)
app.use('/api/reviews', ReviewRouter)
app.use('/api/cart', CartRouter)
app.use('/api/orders', OrderRouter)
app.use('/api/pages', PageRouter)
app.use('/api/news', NewsRouter);
app.use('/api/banners', HomePageBannerRouter)
app.use('/api/wishlist', WishlistItemRouter)

app.use(errorMiddleware)




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
