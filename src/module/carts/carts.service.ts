import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { ProductsService } from '../products';
import { Cart } from '../../schemas';
import { CartItem } from '../../schemas/cart-item.schema'; 
import { Model } from 'mongoose';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  private async validateProductStock(productId: string, quantity: number) {
    const product = await this.productsService.findOne(productId);
    if (product.stock < quantity) {
      throw new BadRequestException(
        `Insufficient stock for product ${product.name}. Only ${product.stock} left.`,
      );
    }
    return product;
  }

  private async findOrCreateCart(userId: string) {
    let cart = await this.cartModel.findOne({ userId, deletedAt: null });

    if (!cart) {
      cart = await this.cartModel.create({ userId });
    }

    return cart;
  }

  private async findCartItemOrThrow(cartItemId: string) {
    const cartItem = await this.cartItemModel.findById(cartItemId).exec();
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }
    return cartItem;
  }

  async create(userId: string, createCartItemDto: CreateCartItemDto) {
    const { productId, quantity } = createCartItemDto;

    const product = await this.validateProductStock(productId, quantity);
    const cart = await this.findOrCreateCart(userId);

    const existingCartItem = await this.cartItemModel.findOne({
      cartId: cart.id,
      productId,
    });

    if (existingCartItem) {
      return this.update(existingCartItem.id, { quantity: existingCartItem.quantity + quantity });
    }

    return this.cartItemModel.create({
      productId,
      cartId: cart.id,
      quantity,
      price: product.price,
    });
  }

  async findMyCart(userId: string) {
    const cart = await this.cartModel.findOne({
      userId,
      deletedAt: null,
    }).populate('items.product');

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async update(cartItemId: string, updateCartItemDto: UpdateCartItemDto) {
    const { quantity } = updateCartItemDto;

    const cartItem = await this.findCartItemOrThrow(cartItemId);

    if (quantity && quantity > 0) {
        await this.validateProductStock(cartItem.productId.toString(), quantity);
    }

    return this.cartItemModel.findByIdAndUpdate(
        cartItemId,
        { quantity: quantity || cartItem.quantity },
        { new: true, runValidators: true },
    ).populate('product');
  }

  async remove(cartItemId: string) {
    await this.findCartItemOrThrow(cartItemId);
    return this.cartItemModel.findByIdAndDelete(cartItemId);
  }

  async clearCart(userId: string) {
    const cart = await this.cartModel.findOne({ userId, deletedAt: null });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return this.cartItemModel.deleteMany({ cartId: cart.id });
  }
}
