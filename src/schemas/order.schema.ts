import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema'; 
import { OrderItem } from './order-item.schema';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
    PENDING,
    SHIPPED,
    DELIVERED,
    CANCELLED,
    COMPLETED,
}

@Schema({ timestamps: true }) 
export class Order {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'OrderItem' }] })
    orderedItems: OrderItem[];

    @Prop({ required: true })
    totalPrice: number;

    @Prop()
    deletedAt: Date | null;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
