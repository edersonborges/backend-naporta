import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PedidosModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth.module';
import { InsertDataModule } from './insert-data/insert-data.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: 'naporta',
      username: 'postgres',
      password: '123456',
      synchronize: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    PedidosModule,
    InsertDataModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
