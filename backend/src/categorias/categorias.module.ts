import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Concessionaria } from 'src/concessionarias/entities/concessionaria.entity';
import { Veiculo } from 'src/veiculos/entities/veiculo.entity';
import { Categoria } from './entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Concessionaria, Veiculo])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
