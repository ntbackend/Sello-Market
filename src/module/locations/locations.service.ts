import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { Location } from '../../schemas';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto, userId: string) {
    const location = new this.locationModel({
      ...createLocationDto,
      userId,
    });
    return location.save();
  }

  async findAll() {
    return this.locationModel.find({ deletedAt: null }).populate('user');
  }

  async findMyLocations(userId: string) {
    return this.locationModel.find({
      userId,
      deletedAt: null,
    });
  }

  async findOne(id: string) {
    const location = await this.locationModel.findById(id).populate('user');

    if (!location || location.deletedAt) {
      throw new NotFoundException('Location not found or has been deleted');
    }

    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    await this.findOne(id);
    return this.locationModel.findByIdAndUpdate(id, updateLocationDto, { new: true });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.locationModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  }
}
