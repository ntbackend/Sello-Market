import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { MarketsService } from './markets.service';
import { CreateMarketDto, UpdateMarketDto } from './dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Role } from '../../schemas';
import { Roles, RolesGuard, successResponse } from '@common';
import { Request } from 'express';

@ApiTags('MARKETS')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}
  
  @Roles(Role.ADMIN)
  @Post('admin')
  @ApiOperation({ summary: 'add market (for admin !)' })
  async createForAdmin(@Body() createMarketDto: CreateMarketDto) {
    console.log(createMarketDto)
    const data = await this.marketsService.createForAdmin(createMarketDto);
    return successResponse(data, 'Market created successfully');
  }

  @Roles(Role.SELLER)
  @Post('seller')
  @ApiOperation({ summary: 'add seller for market' })
  async createForSeller(@Body() createMarketDto: CreateMarketDto, @Req() request: Request) {
    const userId = request.user.id;
    const data = await this.marketsService.createForSeller(createMarketDto, userId);
    return successResponse(data, 'Market created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'all markets' })
  async findAll() {
    const data = await this.marketsService.findAll();
    return successResponse(data, 'All markets retrieved successfully');
  }

  @Roles(Role.SELLER)
  @Get('me')
  @ApiOperation({ summary: 'my markets' })
  async findMyMarkets(@Req() request: Request) {
    const userId = request.user.id;
    const data = await this.marketsService.findMyMarkets(userId);
    return successResponse(data, 'Your markets retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'markets find by id' })
  async findOne(@Param('id') id: string) {
    const data = await this.marketsService.findOne(id);
    return successResponse(data, 'Market retrieved successfully');
  }

  @Roles(Role.ADMIN, Role.SELLER)
  @Put(':id')
  @ApiOperation({ summary: 'update market (for admin or seller !)' })
  async update(@Param('id') id: string, @Body() updateMarketDto: UpdateMarketDto) {
    const data = await this.marketsService.update(id, updateMarketDto);
    return successResponse(data, 'Market updated successfully');
  }

  @Roles(Role.ADMIN, Role.SELLER)
  @Delete(':id')
  @ApiOperation({ summary: 'delete market (for admin or seller !)' })
  async remove(@Param('id') id: string) {
    await this.marketsService.remove(id);
    return successResponse(null, 'Market deleted successfully');
  }
}