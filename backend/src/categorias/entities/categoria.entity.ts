// src/categoria/categoria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Veiculo } from 'src/veiculos/entities/veiculo.entity';
import { Concessionaria } from 'src/concessionarias/entities/concessionaria.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(
    () => Concessionaria,
    (concessionaria) => concessionaria.categorias,
  )
  concessionaria: Concessionaria;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.categoria)
  veiculos: Veiculo[];
}
