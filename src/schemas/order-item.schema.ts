import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';
import { Order } from './order.schema';

export type OrderItemDocument = HydratedDocument<OrderItem>;

@Schema({ timestamps: true }) 
export class OrderItem {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
    productId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
    product: Product;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order', required: true })
    orderId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order', required: true })
    order: Order;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    price: number;

    @Prop()
    deletedAt: Date | null;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);