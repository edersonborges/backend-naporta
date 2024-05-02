// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreencherDadosService } from './insert-data.service';
import { PedidosEntity } from '../pedidos/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidosEntity])],
  providers: [PreencherDadosService],
  // exports: [PreencherDadosService],
})
export class InsertDataModule {}
