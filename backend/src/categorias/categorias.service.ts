import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { Concessionaria } from 'src/concessionarias/entities/concessionaria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Concessionaria)
    private readonly concessionariaRepository: Repository<Concessionaria>,
  ) {}

  async create(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<Categoria> {
    const novaCategoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(novaCategoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }
}
