import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type MarketDocument = HydratedDocument<Market>;

@Schema({ timestamps: true })
export class Market {

    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    logo: string;

    @Prop({ type: Number })
    rating: number | null;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    sellerId: User;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
    products: Product[];

    @Prop()
    deletedAt: Date | null;
}

export const MarketSchema = SchemaFactory.createForClass(Market);
