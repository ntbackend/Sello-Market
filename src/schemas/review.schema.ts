import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema'; 

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
    productId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
    product: Product;

    @Prop({ required: true })
    rating: number;

    @Prop([String])
    photos: string[];

    @Prop({ required: true })
    comment: string;

    @Prop()
    deletedAt?: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);