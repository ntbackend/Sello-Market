import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ProductsService } from '../products';
import { Favorite } from '../../schemas';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private readonly favoriteModel: Model<Favorite>,
    private readonly productsService: ProductsService,
  ) {}

  async toggleFavorite(createFavoriteDto: CreateFavoriteDto, userId: string) {
    const { productId } = createFavoriteDto;

    await this.productsService.findOne(productId); 

    const existingFavorite = await this.favoriteModel.findOne({
      userId,
      productId,
    });

    if (existingFavorite) {
      await this.favoriteModel.deleteOne({ _id: existingFavorite._id });
      return { message: 'Product removed from favorites' };
    } else {
      const newFavorite = new this.favoriteModel({
        userId,
        productId,
      });
      await newFavorite.save();
      return { message: 'Product added to favorites' };
    }
  }

  async findMyFavorites(userId: string) {
    return this.favoriteModel.find({ userId }).populate('product');
  }
}
