import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])
  ],
  controllers: [LocationsController],
  providers: [LocationsService, JwtService, RolesGuard],
})
export class LocationsModule {}