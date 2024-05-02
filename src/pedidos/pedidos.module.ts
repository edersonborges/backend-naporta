import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosEntity } from './pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidosEntity])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
