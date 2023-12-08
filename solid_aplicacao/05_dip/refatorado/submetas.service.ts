import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubmetaDto } from './dto/create-submeta.dto';
import { UpdateSubmetaDto } from './dto/update-submeta.dto';
import { Meta } from 'src/metas/entities/meta.entity';
import { Submeta } from './entities/submeta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Interface para o repositório de Submeta
interface SubmetaRepository {
  save(submeta: Submeta): Promise<Submeta>;
  findOne(options: any): Promise<Submeta | undefined>;
  find(options: any): Promise<Submeta[]>;
  remove(submeta: Submeta): Promise<void>;
}

// Interface para o repositório de Meta
interface MetaRepository {
  findOne(options: any): Promise<Meta | undefined>;
}

@Injectable()
export class SubmetasService {
  constructor(
    @InjectRepository(Submeta)
    private readonly submetaRepository: SubmetaRepository, // Depende da interface
    @InjectRepository(Meta)
    private readonly metaRepository: MetaRepository, // Depende da interface
  ) {}

  async create(metaId: number, createSubmetaDto: CreateSubmetaDto): Promise<Submeta> {
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
      const submeta = await this.submetaRepository.findOne({
        where: { id: submetaId },
      });

      if (!submeta) {
        throw new NotFoundException(`Submeta com ID ${submetaId} não encontrada.`);
      }

      await this.submetaRepository.remove(submeta);
    } catch (error) {
      throw new NotFoundException(
        `Submeta com ID ${submetaId} não encontrada.`,
      );
    }
  }

  async update(metaId: number, submetaId: number, updateSubmetaDto: UpdateSubmetaDto): Promise<Submeta> {
    try {
      const submeta = await this.submetaRepository.findOne({
        where: { id: submetaId, meta: { id: metaId } },
      });

      if (!submeta) {
        throw new NotFoundException(`Submeta com ID ${submetaId} não encontrada.`);
      }

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
