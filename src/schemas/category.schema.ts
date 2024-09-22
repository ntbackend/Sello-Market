import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
    
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
    products: Product[];

    @Prop()
    deletedAt: Date | null;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
