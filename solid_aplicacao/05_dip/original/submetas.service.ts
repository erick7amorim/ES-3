// submetas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmetaDto } from './dto/create-submeta.dto';
import { UpdateSubmetaDto } from './dto/update-submeta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meta } from 'src/metas/entities/meta.entity';
import { Submeta } from './entities/submeta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubmetasService {
  constructor(
    @InjectRepository(Submeta)
    private readonly submetaRepository: Repository<Submeta>,
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>,
  ) {}

  async create(
    metaId: number,
    createSubmetaDto: CreateSubmetaDto,
  ): Promise<Submeta> {
    const meta = await this.metaRepository.findOne({
      where: { id: metaId },
      relations: ['submetas'],
    });

    const novaSubmeta = new Submeta(createSubmetaDto);
    novaSubmeta.meta = meta;

    return this.submetaRepository.save(novaSubmeta);
  }

  async findAll(metaId: number): Promise<Submeta[]> {
    return this.submetaRepository.find({
      where: { meta: { id: metaId } },
      relations: ['meta'],
    });
  }

  async destroy(submetaId: number): Promise<void> {
    try {
      const submeta = await this.submetaRepository.findOneOrFail({
        where: { id: submetaId },
      });
      await this.submetaRepository.remove(submeta);
    } catch (error) {
      throw new NotFoundException(
        `Submeta com ID ${submetaId} não encontrada.`,
      );
    }
  }

  async update(
    metaId: number,
    submetaId: number,
    updateSubmetaDto: UpdateSubmetaDto,
  ): Promise<Submeta> {
    try {
      const submeta = await this.submetaRepository.findOneOrFail({
        where: { id: submetaId, meta: { id: metaId } },
      });

      // Atualizar as propriedades da submeta com base no DTO
      submeta.nome = updateSubmetaDto.nome;
      submeta.descricao = updateSubmetaDto.descricao;
      submeta.valor = updateSubmetaDto.valor;
      submeta.valorFinal = updateSubmetaDto.valorFinal;
      submeta.dataFinal = updateSubmetaDto.dataFinal;
      // ...

      // Salvar as alterações no banco de dados
      return await this.submetaRepository.save(submeta);
    } catch (error) {
      throw new NotFoundException(
        `Submeta com ID ${submetaId} não encontrada.`,
      );
    }
  }
}