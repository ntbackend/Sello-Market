import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from '../../schemas';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryModel.findOne({
      name: createCategoryDto.name,
      deletedAt: null,
    });

    if (existingCategory) {
      throw new BadRequestException('Category with the same name already exists');
    }

    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll() {
    return this.categoryModel.find({ deletedAt: null }).sort({ name: 'asc' });
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).populate('products');

    if (!category || category.deletedAt) {
      throw new NotFoundException('Category not found or has been deleted');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.findOne(id);

    if (updateCategoryDto.name) {
      const conflictingCategory = await this.categoryModel.findOne({
        name: updateCategoryDto.name,
        deletedAt: null,
      });

      if (conflictingCategory && conflictingCategory._id.toString() !== existingCategory._id.toString()) {
        throw new BadRequestException('Category with the same name already exists');
      }
    }

    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.categoryModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  }
}
