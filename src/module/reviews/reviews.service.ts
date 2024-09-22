import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { ProductsService } from '../products/products.service';
import { Review, Product, Market } from '../../schemas';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Market.name) private readonly marketModel: Model<Market>,
    private readonly productsService: ProductsService,
  ) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    const { productId, rating, comment, photos } = createReviewDto;

    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = new this.reviewModel({
      userId,
      productId,
      rating,
      comment,
      photos,
    });

    await review.save();

    await this.updateProductRating(productId);
    await this.updateMarketRating(product.marketId);

    return review;
  }

  async findAllByProduct(productId: string) {
    return this.reviewModel.find({ productId, deletedAt: null }).populate('user');
  }

  async findMyReviews(userId: string) {
    return this.reviewModel.find({ userId, deletedAt: null })
      .populate('product')
      .populate('user');
  }

  async update(reviewId: string, updateReviewDto: UpdateReviewDto) {
    const existingReview = await this.reviewModel.findById(reviewId);
    if (!existingReview) {
      throw new NotFoundException('Review not found');
    }

    Object.assign(existingReview, updateReviewDto);
    await existingReview.save();

    await this.updateProductRating(existingReview.productId);
    await this.updateMarketRating((await this.productsService.findOne(existingReview.productId)).marketId);

    return existingReview;
  }

  async remove(reviewId: string) {
    const review = await this.reviewModel.findById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    review.deletedAt = new Date();
    await review.save();

    await this.updateProductRating(review.productId);
    await this.updateMarketRating((await this.productsService.findOne(review.productId)).marketId);
  }

  private async updateProductRating(productId: string) {
    const ratings = await this.reviewModel.aggregate([
      { $match: { productId, deletedAt: null } },
      { $group: { _id: '$productId', avgRating: { $avg: '$rating' } } },
    ]);

    const avgRating = ratings.length > 0 ? ratings[0].avgRating : 0;

    await this.productModel.findByIdAndUpdate(productId, { rating: avgRating });
  }

  private async updateMarketRating(marketId: string) {
    const ratings = await this.productModel.aggregate([
      { $match: { marketId, deletedAt: null } },
      { $group: { _id: '$marketId', avgRating: { $avg: '$rating' } } },
    ]);

    const avgRating = ratings.length > 0 ? ratings[0].avgRating : 0;

    await this.marketModel.findByIdAndUpdate(marketId, { rating: avgRating });
  }
}
