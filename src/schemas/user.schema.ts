import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Location } from './location.schema'; 
import { Order } from './order.schema'; 
import { Review } from './review.schema'; 
import { Cart } from './cart.schema'; 
import { Market } from './market.schema'; 
import { Favorite } from './favorite.schema'; 

export type UserDocument = HydratedDocument<User>;

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SELLER = 'SELLER',
    WAREHOUSE_MANAGER = 'WAREHOUSE_MANAGER'
}

@Schema({ timestamps: true }) 
export class User {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    fullname: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Location' }] })
    locations: Location[];

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Order' }] })
    orders: Order[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Review' }] })
    reviews: Review[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Cart' }] })
    carts: Cart[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Market' }] })
    markets: Market[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Favorite' }] })
    favorites: Favorite[];

    @Prop()
    deletedAt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
