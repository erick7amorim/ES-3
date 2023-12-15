/* eslint-disable prettier/prettier */
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Veiculo } from 'src/veiculos/entities/veiculo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Concessionaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.concessionaria, { cascade: true })
  veiculos: Veiculo[];

  @OneToMany(() => Categoria, (categoria) => categoria.concessionaria)
  categorias: Categoria[];

  constructor(concessionaria: Partial<Concessionaria>) {
    Object.assign(this, concessionaria);
  }
}
