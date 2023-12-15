import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ConcessionariasService } from './concessionarias.service';
import { Concessionaria } from './entities/concessionaria.entity';

@Controller('concessionarias')
export class ConcessionariasController {
  constructor(private readonly concessionariasService: ConcessionariasService) {}

  @Get()
  findAll(): Promise<Concessionaria[]> {
    return this.concessionariasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Concessionaria> {
    return this.concessionariasService.findOne(+id);
  }

  @Post()
  create(@Body() concessionariaData: Partial<Concessionaria>): Promise<Concessionaria> {
    return this.concessionariasService.create(concessionariaData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() concessionariaData: Partial<Concessionaria>,
  ): Promise<Concessionaria> {
    return this.concessionariasService.update(+id, concessionariaData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.concessionariasService.remove(+id);
  }
}
