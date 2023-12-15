import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { Veiculo } from './entities/veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Get()
  async findAll() {
    return this.veiculosService.findAll();
  }

  @Post('concessionarias/:concessionariaId')
  async create(
    @Param('concessionariaId') concessionariaId: number,
    @Body() createVeiculoDto: CreateVeiculoDto,
  ) {
    return this.veiculosService.create(createVeiculoDto);
  }
}
