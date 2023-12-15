import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { Concessionaria } from '../concessionarias/entities/concessionaria.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
    @InjectRepository(Concessionaria)
    private readonly concessionariaRepository: Repository<Concessionaria>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    try {
      const concessionariaId = createVeiculoDto.concessionariaId;

      const concessionaria = await this.concessionariaRepository.findOneOrFail({
        where: { id: concessionariaId },
        relations: ['veiculos'],
      });

      const categoria = await this.categoriaRepository.findOneOrFail({
        where: { id: createVeiculoDto.categoriaId },
      });

      const novoVeiculo = new Veiculo({
        nome: createVeiculoDto.nome,
        categoria: categoria,
        concessionaria: concessionaria,
      });

      return this.veiculoRepository.save(novoVeiculo);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async findAll(): Promise<Veiculo[]> {
    return this.veiculoRepository.find({
      relations: ['categoria', 'concessionaria'],
    });
  }
}
