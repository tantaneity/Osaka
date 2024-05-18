import "reflect-metadata"
import { DataSource } from "typeorm"

import { config } from "dotenv"
import { UserEntity } from "../models/entities/UserEntity"
import { TokenEntity } from "../models/entities/TokenEntity"
import { ProductEntity } from "../models/entities/ProductEntity"
import { CategoryEntity } from "../models/entities/CategoryEntity"
import { ReviewEntity } from "../models/entities/ReviewEntity"
import { ImageEntity } from "../models/entities/ImageEntity"
import { AdminEntity } from "../models/entities/AdminEntity"
import { PermissionEntity } from "../models/entities/PermissionEntity"
import { CartEntity } from "../models/entities/CartEntity"
import { CartItemEntity } from "../models/entities/CartItemEntity"
import { SellEntity } from "../models/entities/SellEntity"
import { OrderEntity } from "../models/entities/OrderEntity"
import { OrderItemEntity } from "../models/entities/OrderItemEntity"
import { OrderStatusEntity } from "../models/entities/OrderStatusEntity"

config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.PG_USERNAME || 'online_store_db',
    synchronize: true,
    logging: false,
    entities: [UserEntity, TokenEntity, ProductEntity, CategoryEntity, ReviewEntity, ImageEntity, AdminEntity, PermissionEntity, CartEntity, CartItemEntity, SellEntity, OrderEntity, OrderItemEntity, OrderStatusEntity],
    migrations: [],
    subscribers: [],
})
