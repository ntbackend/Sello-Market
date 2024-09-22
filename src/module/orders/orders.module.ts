import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { ProductsModule } from '../products';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, JwtService, RolesGuard],
})
export class OrdersModule {}