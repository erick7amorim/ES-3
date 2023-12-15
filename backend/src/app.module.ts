import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ConcessionariasModule } from './concessionarias/concessionarias.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ConcessionariasModule, VeiculosModule, CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
