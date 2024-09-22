import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { MarketsModule } from '../markets';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MarketsModule
    ],
  controllers: [ProductsController],
  providers: [ProductsService, JwtService, RolesGuard],
  exports: [ProductsService]
})
export class ProductsModule {}