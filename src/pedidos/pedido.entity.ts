import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pedido ' })
export class PedidosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'numPedido', nullable: false })
  numPedido: number;

  @Column({ name: 'dataPrevista', nullable: false })
  dataPrevista: Date;

  @Column({ name: 'clienteNome', nullable: false })
  clienteNome: string;

  @Column({ name: 'clienteDoc', nullable: false })
  clienteDoc: string;

  @Column({ name: 'endereco', nullable: false })
  endereco: string;

  @Column({ name: 'pedidoDesc', nullable: false })
  pedidoDesc: string;

  @Column({ name: 'pedidoValor', nullable: false })
  pedidoValor: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @Column({ name: 'status', nullable: true })
  status: number;
}
