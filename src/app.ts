import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, CartsModule, CategoriesModule, FavoritesModule, LocationsModule, MarketsModule, OrdersModule, ProductsModule, ReviewsModule, UploadModule, UsersModule } from '@module'
import { AppConfig, DbConfig, JwtConfig, MailConfig, R2Config, SwaggerConfig } from '@config';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ibrohimjoraboyev01:0DPDn9iARUusnyDM@cluster0.zoqbea9.mongodb.net/myLastExamWithNajotTalim'
    ),
    CacheModule.register({
      ttl: 300000,
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [
        AppConfig,
        DbConfig,
        JwtConfig,
        R2Config,
        SwaggerConfig,
        MailConfig
      ],
      isGlobal: true
    }),
    UploadModule,
    AuthModule,
    UsersModule,
    MarketsModule,
    LocationsModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    CartsModule,
    FavoritesModule,
    ReviewsModule
  ],
})
export class AppModule { }