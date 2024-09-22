import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, JwtService, RolesGuard],
  exports: [UsersService],
})
export class UsersModule {}