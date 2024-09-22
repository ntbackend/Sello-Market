
import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles, RolesGuard, successResponse } from '@common';
import { Role } from '../../schemas';
import { Request } from 'express';

@ApiTags('CARDS')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('cards')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Roles(Role.USER)
  @Post('items')
  @ApiOperation({ summary: 'add card' })
  async addToCart(@Body() createCartItemDto: CreateCartItemDto, @Req() request: Request) {
    const userId = request.user.id;
    const data = await this.cartsService.create(userId, createCartItemDto);
    return successResponse(data, 'Item added to card successfully');
  }

  @Roles(Role.USER)
  @Get('me')
  @ApiOperation({ summary: 'all my cards' })
  async getMyCart(@Req() request: Request) {
    const userId = request.user.id;
    const data = await this.cartsService.findMyCart(userId);
    return successResponse(data, 'Your card retrieved successfully');
  }

  @Roles(Role.USER)
  @Put('items/:id')
  @ApiOperation({ summary: 'update card' })
  async updateCartItem(
    @Param('id') cartItemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const data = await this.cartsService.update(cartItemId, updateCartItemDto);
    return successResponse(data, 'Card item updated successfully');
  }

  @Roles(Role.USER)
  @Delete('items/:id')
  @ApiOperation({ summary: 'delete one card' })
  async removeCartItem(@Param('id') cartItemId: string) {
    await this.cartsService.remove(cartItemId);
    return successResponse(null, 'Card item removed successfully');
  }

  @Roles(Role.USER)
  @Delete('clear')
  @ApiOperation({ summary: 'delete all cards' })
  async clearMyCart(@Req() request: Request) {
    const userId = request.user.id;
    await this.cartsService.clearCart(userId);
    return successResponse(null, 'Card deleted successfully');
  }
}
