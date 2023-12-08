import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Meta } from './entities/meta.entity';
import { Repository } from 'typeorm';
import { Submeta } from 'src/submetas/entities/submeta.entity';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Submeta)
    private readonly submetaRepository: Repository<Submeta>,
  ) {}

  async create(usuarioId: number, createMetaDto: CreateMetaDto): Promise<Meta> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
      relations: ['metas'],
    });

    const novaMeta = new Meta(createMetaDto);
    novaMeta.usuario = usuario;

    return this.metaRepository.save(novaMeta);
  }

  async findAll(usuarioId: number): Promise<Meta[]> {
    return this.metaRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'],
    });
  }

  async destroy(transacaoId: number): Promise<void> {
    try {
      const transacao = await this.metaRepository.findOneOrFail({
        where: { id: transacaoId },
        relations: ['submetas'],
      });

      // Remova as submetas manualmente
      await this.submetaRepository.remove(transacao.submetas);

      // Agora, remova a meta
      await this.metaRepository.remove(transacao);
    } catch (error) {
      throw new NotFoundException(
        `Transação com ID ${transacaoId} não encontrada.`,
      );
    }
  }

  async update(
    usuarioId: number,
    metaId: number,
    updateMetaDto: UpdateMetaDto,
  ): Promise<Meta> {
    try {
      const meta = await this.metaRepository.findOneOrFail({
        where: { id: metaId, usuario: { id: usuarioId } },
      });

      // Atualizar as propriedades da meta com base no DTO
      meta.nome = updateMetaDto.nome;
      meta.valor = updateMetaDto.valor;
      meta.data = updateMetaDto.data;
      meta.descricao = updateMetaDto.descricao;
      // ...

      // Salvar as alterações no banco de dados
      return await this.metaRepository.save(meta);
    } catch (error) {
      throw new NotFoundException(`Meta com ID ${metaId} não encontrada.`);
    }
  }
}