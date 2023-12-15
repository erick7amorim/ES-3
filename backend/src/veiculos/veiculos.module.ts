import { Module } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { Concessionaria } from 'src/concessionarias/entities/concessionaria.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo, Concessionaria, Categoria])],
  controllers: [VeiculosController],
  providers: [VeiculosService],
})
export class VeiculosModule {}
