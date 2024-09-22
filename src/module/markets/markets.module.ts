import { Module } from '@nestjs/common';
import { MarketsService } from './markets.service';
import { MarketsController } from './markets.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@common';
import { MongooseModule } from '@nestjs/mongoose';
import { Market, MarketSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Market.name, schema: MarketSchema }])
  ],
  controllers: [MarketsController],
  providers: [MarketsService, JwtService, RolesGuard],
  exports: [MarketsService]
})
export class MarketsModule {}