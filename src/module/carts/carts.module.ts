import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { ProductsModule } from '../products';
import { Cart, CartItem, CartItemSchema, CartSchema } from '../../schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  MongooseModule.forFeature([{ name: CartItem.name, schema: CartItemSchema }]),
  ProductsModule
  ],
  controllers: [CartsController],
  providers: [CartsService, JwtService, RolesGuard],
})
export class CartsModule { }