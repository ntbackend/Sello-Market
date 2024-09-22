import { Controller, Get, Post, Delete, Param, Body, UseGuards, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Role } from '../../schemas';
import { JwtPayload, Roles, RolesGuard, successResponse } from '@common';
import { Request } from 'express';

@ApiTags("USERS")
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles(Role.ADMIN, Role.SELLER, Role.USER, Role.WAREHOUSE_MANAGER)
  @Get('me')
  @ApiOperation({ summary: 'my profile' })
  async getMe(@Req() request: Request) {
    const user = request.user as JwtPayload;
    const userProfile = await this.usersService.getUserById(user.id);
    return successResponse(userProfile, 'User profile fetched successfully');
  }

  @Roles(Role.ADMIN, Role.SELLER, Role.USER, Role.WAREHOUSE_MANAGER)
  @Put('me')
  @ApiOperation({ summary: 'update my profile' })
  async updateMe(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = request.user as JwtPayload;
    const updatedUser = await this.usersService.updateUser(user.id, updateUserDto);
    return successResponse(updatedUser, 'User profile updated successfully');
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'add user (for admin !)' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return successResponse(newUser, 'User created successfully');
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'users find by id (for admin !)' })
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    return successResponse(user, 'User found successfully');
  }

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'all users (for admin !)' })
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return successResponse(users, 'All users found successfully');
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'update user by id (for admin !)' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    return successResponse(updatedUser, 'User updated successfully');
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'delete user by id (for admin !)' })
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return successResponse(null, 'User deleted successfully');
  }
}