import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Cart } from './cart.schema';
import { Product } from './product.schema';

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema({ timestamps: true })
export class CartItem {
    @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
    id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
    productId: Product;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Cart', required: true })
    cartId: Cart;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    price: number;

    @Prop()
    deletedAt: Date | null;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
