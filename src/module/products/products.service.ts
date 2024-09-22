import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MarketsService } from "../markets";
import { CreateProductDto, FilterProductDto, UpdateProductDto } from "./dto";
import { Product } from "../../schemas";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly marketsService: MarketsService,
  ) {}

  async updateStock(productId: string, newStock: number) {
    return this.productModel.findByIdAndUpdate(
      productId,
      { stock: newStock },
      { new: true }
    );
  }

  async updateOrderCount(productId: string, increment: boolean) {
    const product = await this.findOne(productId);
    const updatedOrderCount = increment 
      ? (product.orderCount || 0) + 1 
      : (product.orderCount || 0) - 1;

    await this.productModel.findByIdAndUpdate(
      productId,
      { orderCount: updatedOrderCount < 0 ? 0 : updatedOrderCount }
    );
  }

  async create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(userId: string, filterDto: FilterProductDto) {
    const {
      search,
      minPrice,
      maxPrice,
      minRating,
      categoryId,
      marketId,
      sortBy = 'name',
      sortDirection = 'asc',
      page = 1,
      pageSize = 10,
    } = filterDto;

    const skip = (page - 1) * pageSize;

    const products = await this.productModel.find({
      deletedAt: null,
      ...(search && {
          $or: [
              { name: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } },
          ],
      }),
      ...(minPrice && { price: { $gte: minPrice } }),
      ...(maxPrice && { price: { $lte: maxPrice } }),
      ...(minRating && { rating: { $gte: minRating } }),
      ...(categoryId && { categoryId }),
      ...(marketId && { marketId }),
    })
    .skip(skip)
    .limit(pageSize)
    .sort({ [sortBy]: sortDirection })
    .populate({
      path: 'favorites',
      match: { userId },
    });

    const totalCount = await this.productModel.countDocuments({
      deletedAt: null,
      ...(search && {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      }),
      ...(minPrice && { price: { $gte: minPrice } }),
      ...(maxPrice && { price: { $lte: maxPrice } }),
      ...(minRating && { rating: { $gte: minRating } }),
      ...(categoryId && { categoryId }),
      ...(marketId && { marketId }),
    });

    const productsWithFavorite = products.map((product) => ({
      ...product.toObject(),
      isFavorite: product.favorites.length > 0,
    }));

    return { data: productsWithFavorite, totalCount, page, pageSize };
  }

  async findMyProducts(userId: string) {
    const markets = await this.marketsService.findMyMarkets(userId);
    const marketIds = markets.map((market) => market.id);

    return this.productModel.find({
      marketId: { $in: marketIds },
      deletedAt: null,
    })
    .populate('category')
    .populate('market')
    .sort({ name: 'asc' });
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id)
      .populate('category')
      .populate('market');

    if (!product || product.deletedAt) {
      throw new NotFoundException('Product not found or has been deleted');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.productModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  }
}
