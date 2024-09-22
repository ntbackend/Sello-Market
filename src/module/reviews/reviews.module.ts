import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { ProductsModule } from '../products';
import { MongooseModule } from '@nestjs/mongoose';
import { Market, MarketSchema, Product, ProductSchema, Review, ReviewSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), 
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Market.name, schema: MarketSchema }]),
    ProductsModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, JwtService, RolesGuard],
})
export class ReviewsModule {}