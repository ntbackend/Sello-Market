import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../../schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtService, RolesGuard],
})
export class CategoriesModule {}