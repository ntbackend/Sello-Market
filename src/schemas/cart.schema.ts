import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema'; 
import { CartItem } from './cart-item.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CartItem' }] })
    items: CartItem[];

    @Prop()
    deletedAt: Date | null;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
