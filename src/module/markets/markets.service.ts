import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMarketDto, UpdateMarketDto } from './dto';
import { Market } from '../../schemas';

@Injectable()
export class MarketsService {
  constructor(
    @InjectModel(Market.name) private readonly marketModel: Model<Market>,
  ) {}

  private async findMarketByName(name: string) {
    return this.marketModel.findOne({ name, deletedAt: null });
  }

  async createForAdmin({ description, logo, name, userId }: CreateMarketDto) {
    await this.ensureMarketNameIsUnique(name);
    const market = new this.marketModel({
      name,
      description,
      logo,
      sellerId: userId,
    });
    return market.save();
  }

  async createForSeller({ description, logo, name }: CreateMarketDto, userId: string) {
    console.log(description)

    await this.ensureMarketNameIsUnique(name);
    const market = new this.marketModel({
      name,
      description,
      logo,
      sellerId: userId,
    });
    return market.save();
  }

  private async ensureMarketNameIsUnique(name: string) {
    const market = await this.findMarketByName(name);
    console.log(market)
    if (market) {

      throw new BadRequestException('Market with the same name already exists');
    }
  }

  async findAll() {
    return this.marketModel.find({ deletedAt: null }).populate('seller');
  }

  async findMyMarkets(userId: string) {
    return this.marketModel.find({
      sellerId: userId,
      deletedAt: null,
    }).populate('products');
  }

  async findOne(id: string) {
    const market = await this.marketModel.findById(id);
    if (!market || market.deletedAt) {
      throw new NotFoundException('Market not found');
    }
    return market;
  }

  async update(id: string, updateMarketDto: UpdateMarketDto) {
    await this.findOne(id);
    return this.marketModel.findByIdAndUpdate(id, updateMarketDto, { new: true });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.marketModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  }
}
