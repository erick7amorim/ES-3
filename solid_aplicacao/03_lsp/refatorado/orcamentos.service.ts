import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orcamento } from './entities/orcamento.entity';
import { EntityManager, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

// Interface para o repositório de Orcamento
interface OrcamentoRepository {
  save(orcamento: Orcamento): Promise<Orcamento>;
  findOne(options: any): Promise<Orcamento | undefined>;
  find(options: any): Promise<Orcamento[]>;
  remove(orcamento: Orcamento): Promise<void>;
}

// Interface para o repositório de Usuario
interface UsuarioRepository {
  findOne(options: any): Promise<Usuario | undefined>;
}

@Injectable()
export class OrcamentosService {
  constructor(
    @InjectRepository(Orcamento)
    private readonly orcamentosRepository: OrcamentoRepository, // Depende da interface
    @InjectRepository(Usuario)
    private readonly usuarioRepository: UsuarioRepository, // Depende da interface
  ) {}

  async create(
    usuarioId: number,
    createOrcamentoDto: CreateOrcamentoDto,
  ): Promise<Orcamento> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
      relations: ['transacoes'],
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com ID ${usuarioId} não encontrado.`,
      );
    }

    const novoOrcamento = new Orcamento(createOrcamentoDto);
    novoOrcamento.usuario = usuario;

    return this.orcamentosRepository.save(novoOrcamento);
  }

  async findAll(usuarioId: number): Promise<Orcamento[]> {
    return this.orcamentosRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario'],
    });
  }

  async update(
    orcamentoId: number,
    updateOrcamentoDto: UpdateOrcamentoDto,
  ): Promise<Orcamento> {
    try {
      const orcamento = await this.orcamentosRepository.findOne({
        where: { id: orcamentoId },
      });

      if (!orcamento) {
        throw new NotFoundException(`Orcamento com ID ${orcamentoId} não encontrado.`);
      }

      orcamento.limite = updateOrcamentoDto.limite;
      orcamento.data = updateOrcamentoDto.data;
      // ...

      return await this.orcamentosRepository.save(orcamento);
    } catch (error) {
      throw new NotFoundException(
        `Orcamento com ID ${orcamentoId} não encontrado.`,
      );
    }
  }

  async destroy(orcamentoId: number): Promise<void> {
    try {
      const orcamento = await this.orcamentosRepository.findOne({
        where: { id: orcamentoId },
      });

      if (!orcamento) {
        throw new NotFoundException(`Orcamento com ID ${orcamentoId} não encontrado.`);
      }

      await this.orcamentosRepository.remove(orcamento);
    } catch (error) {
      throw new NotFoundException(
        `Orcamento com ID ${orcamentoId} não encontrado.`,
      );
    }
  }
}
