import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard, Roles, successResponse } from '@common';
import { Role } from '../../schemas';
import { Request } from 'express';

@ApiTags('FAVORITES')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Roles(Role.USER)
  @Post('create-update')
  @ApiOperation({ summary: 'favorites create or update' })
  async toggleFavorite(@Body() createFavoriteDto: CreateFavoriteDto, @Req() request: Request) {
    const user = request.user;
    const result = await this.favoritesService.toggleFavorite(createFavoriteDto, user.id);
    return successResponse(null, result.message);
  }

  @Roles(Role.USER)
  @Get()
  @ApiOperation({ summary: 'all favorite' })
  async findMyFavorites(@Req() request: Request) {
    const user = request.user;
    const data = await this.favoritesService.findMyFavorites(user.id);
    return successResponse(data, 'Favorites retrieved successfully');
  }
}