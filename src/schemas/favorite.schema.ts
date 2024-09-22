import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema({ timestamps: true })
export class Favorite {
    @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
    id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
    productId: Product;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ unique: true })
    uniqueCombination: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
