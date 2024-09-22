import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductsService } from "../products";
import { CreateOrderDto, UpdateOrderDto } from "./dto";
import { Order, OrderStatus } from "../../schemas";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly productsService: ProductsService,
  ) {}

  private async handleStock(productId: string, quantity: number, reduce: boolean = true) {
    const product = await this.productsService.findOne(productId);
    const updatedStock = reduce ? product.stock - quantity : product.stock + quantity;

    if (updatedStock < 0) {
      throw new BadRequestException(
        `Insufficient stock for product ${product.name}. Only ${product.stock} left.`,
      );
    }

    await this.productsService.updateStock(productId, updatedStock);
    return product;
  }

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const { items } = createOrderDto;

    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const product = await this.handleStock(item.productId, item.quantity, true);
      const itemPrice = product.price * item.quantity;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      totalPrice += itemPrice;

      await this.productsService.updateOrderCount(item.productId, true);
    }

    const order = new this.orderModel({
      userId,
      totalPrice,
      orderedItems: orderItems,
      status: OrderStatus.PENDING, // Yangi buyurtma statusi
      createdAt: new Date(),
    });

    return order.save();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).populate('orderedItems.productId').populate('user');

    if (!order || order.deletedAt) {
      throw new NotFoundException('Order not found or has been deleted');
    }

    return order;
  }

  async findAll() {
    return this.orderModel.find({ deletedAt: null })
      .populate('orderedItems.productId')
      .populate('user')
      .sort({ createdAt: -1 });
  }

  async findMyOrders(userId: string) {
    return this.orderModel.find({ userId, deletedAt: null })
      .populate('orderedItems.productId')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    const { items, status } = updateOrderDto;
    const updatedItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const product = await this.handleStock(item.productId, item.quantity, true);
      const itemPrice = product.price * item.quantity;

      updatedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });

      totalPrice += itemPrice;
    }

    return this.orderModel.findByIdAndUpdate(id, {
      status,
      totalPrice: totalPrice > 0 ? totalPrice : undefined,
      orderedItems: updatedItems,
    }, { new: true });
  }

  async cancelOrder(id: string, userId: string) {
    const order = await this.findOne(id);

    if (order.userId !== userId) {
      throw new ForbiddenException('You are not allowed to cancel this order');
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Order can only be cancelled if it is still pending');
    }

    for (const orderItem of order.orderedItems) {
      await this.handleStock(orderItem.productId, orderItem.quantity, false);
      await this.productsService.updateOrderCount(orderItem.productId, false);
    }

    return this.orderModel.findByIdAndUpdate(id, { status: OrderStatus.CANCELLED }, { new: true });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.orderModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  }
}
