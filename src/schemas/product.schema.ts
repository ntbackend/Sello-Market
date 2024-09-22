import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.schema'; 
import { Market } from './market.schema'; 

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true }) 
export class Product {

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop([String])
    photos: string[];

    @Prop({ required: true })
    price: number;

    @Prop({ default: 0 })
    stock: number;

    @Prop()
    orderCount?: number;

    @Prop()
    rating?: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
    categoryId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
    category: Category;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Market', required: true })
    marketId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Market', required: true })
    market: Market;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'OrderItem' }] })
    orders: MongooseSchema.Types.ObjectId[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Review' }] })
    reviews: MongooseSchema.Types.ObjectId[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'WaybillItem' }] })
    waybills: MongooseSchema.Types.ObjectId[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CartItem' }] })
    carts: MongooseSchema.Types.ObjectId[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Favorite' }] })
    favorites: MongooseSchema.Types.ObjectId[];

    @Prop()
    deletedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);