// preencher-dados.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidosEntity } from '../pedidos/pedido.entity';

@Injectable()
export class PreencherDadosService implements OnModuleInit {
  constructor(
    @InjectRepository(PedidosEntity)
    private pedidoRepository: Repository<PedidosEntity>,
  ) {}

  async onModuleInit() {
    await this.preencherPedidos();
  }

  private async preencherPedidos() {
    const pedidos = [
      {
        numPedido: 1,
        dataPrevista: '2024-04-29',
        clienteNome: 'Cliente Teste Auto',
        clienteDoc: '123456789',
        endereco: 'Endereço 1',
        pedidoDesc: 'Descrição do pedido 1',
        pedidoValor: 100,
        status: 3,
      },
      {
        numPedido: 2,
        dataPrevista: '2024-05-23',
        clienteNome: 'Cliente Teste Auto2',
        clienteDoc: '123456789',
        endereco: 'Endereço 2',
        pedidoDesc: 'Descrição do pedido 2',
        pedidoValor: 200,
        status: 2,
      },
      {
        numPedido: 3,
        dataPrevista: '2029-05-23',
        clienteNome: 'Cliente Teste Auto3',
        clienteDoc: '123456789',
        endereco: 'Endereço 3',
        pedidoDesc: 'Descrição do pedido 3',
        pedidoValor: 300,
        status: 1,
      },
    ];

    await Promise.all(
      pedidos.map(async (pedido) => {
        const checkPedido = await this.pedidoRepository.findOne({
          where: { numPedido: pedido.numPedido },
        });

        if (!checkPedido) {
          await this.pedidoRepository.save(pedido);
        }
      }),
    );
  }
}
