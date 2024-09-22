import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ProductsModule } from '../products';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from '../../schemas';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),
  ProductsModule
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtService, RolesGuard],
})
export class FavoritesModule {}