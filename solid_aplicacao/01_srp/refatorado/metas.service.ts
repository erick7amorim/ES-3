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
    const usuario = await this.getUsuario(usuarioId);
    const novaMeta = new Meta(createMetaDto);
    novaMeta.usuario = usuario;

    return this.metaRepository.save(novaMeta);
  }

  async findAll(usuarioId: number): Promise<Meta[]> {
    const usuario = await this.getUsuario(usuarioId);
    return this.metaRepository.find({
      where: { usuario: { id: usuario.id } },
      relations: ['usuario'],
    });
  }

  async destroy(metaId: number): Promise<void> {
    try {
      const meta = await this.getMetaComSubmetas(metaId);
      await this.removeSubmetasEhMeta(meta);
    } catch (error) {
      throw new NotFoundException(`Meta com ID ${metaId} não encontrada.`);
    }
  }

  async update(
    usuarioId: number,
    metaId: number,
    updateMetaDto: UpdateMetaDto,
  ): Promise<Meta> {
    try {
      const meta = await this.getMetaPorUsuarioEId(usuarioId, metaId);
      this.atualizarPropriedadesMeta(meta, updateMetaDto);
      return await this.metaRepository.save(meta);
    } catch (error) {
      throw new NotFoundException(`Meta com ID ${metaId} não encontrada.`);
    }
  }

  private async getUsuario(usuarioId: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
      relations: ['metas'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${usuarioId} não encontrado.`);
    }

    return usuario;
  }

  private async getMetaPorUsuarioEId(usuarioId: number, metaId: number): Promise<Meta> {
    const meta = await this.metaRepository.findOneOrFail({
      where: { id: metaId, usuario: { id: usuarioId } },
    });

    return meta;
  }

  private async getMetaComSubmetas(metaId: number): Promise<Meta> {
    const meta = await this.metaRepository.findOneOrFail({
      where: { id: metaId },
      relations: ['submetas'],
    });

    return meta;
  }

  private async removeSubmetasEhMeta(meta: Meta): Promise<void> {
    await this.submetaRepository.remove(meta.submetas);
    await this.metaRepository.remove(meta);
  }

  private atualizarPropriedadesMeta(meta: Meta, updateMetaDto: UpdateMetaDto): void {
    meta.nome = updateMetaDto.nome;
    meta.valor = updateMetaDto.valor;
    meta.data = updateMetaDto.data;
    meta.descricao = updateMetaDto.descricao;
    // ...
  }
}
