import { Module } from '@nestjs/common';
import { ConcessionariasService } from './concessionarias.service';
import { ConcessionariasController } from './concessionarias.controller';
import { Concessionaria } from './entities/concessionaria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from 'src/veiculos/entities/veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concessionaria, Veiculo])],
  controllers: [ConcessionariasController],
  providers: [ConcessionariasService],
})
export class ConcessionariasModule {}
