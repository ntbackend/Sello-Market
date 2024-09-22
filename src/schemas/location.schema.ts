import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type LocationDocument = HydratedDocument<Location>;

@Schema({ timestamps: true }) 
export class Location {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop()
    address?: string;

    @Prop({ required: true })
    longitude: number;

    @Prop({ required: true })
    latitude: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop()
    deletedAt: Date | null;
}

export const LocationSchema = SchemaFactory.createForClass(Location);