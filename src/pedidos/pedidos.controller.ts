import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Delete,
  Param,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PedidosService } from './pedidos.service';
import { CreatePedidoData } from './create.pedido.data';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidoService: PedidosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllRequests(@Res() response: Response) {
    const pedidos = await this.pedidoService.findAllRequests();
    return response.status(200).json(pedidos);
  }

  @Get('buscar')
  @UseGuards(JwtAuthGuard)
  async buscarPedidos(
    @Query('numero') numero: string,
    @Query('dataInicial') dataInicial: string,
    @Query('dataFinal') dataFinal: string,
    @Query('status') status: string,
  ) {
    return this.pedidoService.searchRequests(
      numero,
      dataInicial,
      dataFinal,
      status,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'Dados para criar um novo pedido',
    schema: {
      type: 'object',
      properties: {
        numPedido: { type: 'string' },
        dataPrevista: { type: 'string' },
        clienteNome: { type: 'string' },
        clienteDoc: { type: 'string' },
        endereco: { type: 'string' },
        pedidoDesc: { type: 'string' },
        pedidoValor: { type: 'number' },
        status: { type: 'number' },
      },
    },
  })
  async createRequests(
    @Res() response: Response,
    @Body() createPedido: CreatePedidoData,
  ) {
    const pedidoCreated = await this.pedidoService.createRequest(createPedido);
    return response.status(200).json(pedidoCreated);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRequest(@Param('id') id: string) {
    await this.pedidoService.deleteRequest(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Dados para editar um pedido existente',
    schema: {
      type: 'object',
      properties: {
        dataPrevista: { type: 'string' },
        clienteNome: { type: 'string' },
        clienteDoc: { type: 'string' },
        endereco: { type: 'string' },
        pedidoDesc: { type: 'string' },
        pedidoValor: { type: 'number' },
        status: { type: 'number' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  async editarPedido(
    @Param('id') id: string,
    @Body() requestData: Partial<CreatePedidoData>,
  ) {
    return this.pedidoService.editRequest(id, requestData);
  }
}
