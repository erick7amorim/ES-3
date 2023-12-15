/* eslint-disable prettier/prettier */
import { Concessionaria } from 'src/concessionarias/entities/concessionaria.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Concessionaria, (concessionaria) => concessionaria.veiculos, {
    onDelete: 'CASCADE',
  })
  concessionaria: Concessionaria;

  @ManyToOne(() => Categoria, (categoria) => categoria.veiculos)
  categoria: Categoria;

  constructor(veiculo: Partial<Veiculo>) {
    Object.assign(this, veiculo);
  }
}
