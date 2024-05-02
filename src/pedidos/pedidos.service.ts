import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidosEntity } from './pedido.entity';
import { CreatePedidoData } from './create.pedido.data';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(PedidosEntity)
    private readonly pedidosRepository: Repository<PedidosEntity>,
  ) {}

  async findAllRequests(): Promise<PedidosEntity[]> {
    const pedidos = await this.pedidosRepository.find();
    return pedidos;
  }

  async createRequest(pedidoData: CreatePedidoData): Promise<CreatePedidoData> {
    const createdPedido = await this.pedidosRepository.save(pedidoData);
    return createdPedido;
  }

  async deleteRequest(id: string) {
    await this.pedidosRepository.delete(id);
  }

  async searchRequests(
    numero: string,
    dataInicial: string,
    dataFinal: string,
    status: string,
  ) {
    const queryBuilder = this.pedidosRepository.createQueryBuilder('pedido');

    if (numero) {
      queryBuilder.andWhere('pedido.numPedido = :numero', { numero });
    }

    if (dataInicial && dataFinal) {
      queryBuilder.andWhere(
        'pedido.dataPrevista BETWEEN :dataInicial AND :dataFinal',
        { dataInicial, dataFinal },
      );
    }

    if (status) {
      queryBuilder.andWhere('pedido.status = :status', { status });
    }

    return queryBuilder.getMany();
  }

  async editRequest(id: string, pedidoData: Partial<CreatePedidoData>) {
    await this.pedidosRepository.update(id, pedidoData);
    const pedidoAtualizado = await this.pedidosRepository.findOne({
      where: { id },
    });
    return {
      message: 'Pedido atualizado com sucesso',
      pedido: pedidoAtualizado,
    };
  }
}
