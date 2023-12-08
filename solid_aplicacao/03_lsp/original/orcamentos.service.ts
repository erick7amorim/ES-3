import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orcamento } from './entities/orcamento.entity';
import { EntityManager, Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class OrcamentosService {
  constructor(
    @InjectRepository(Orcamento)
    private readonly orcamentosRepository: Repository<Orcamento>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
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
      // Lide com o caso em que nenhum usuário é encontrado
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

  findOne(id: number) {
    return `This action returns a #${id} orcamento`;
  }

  async update(
    orcamentoId: number,
    updateOrcamentoDto: UpdateOrcamentoDto,
  ): Promise<Orcamento> {
    try {
      const orcamento = await this.orcamentosRepository.findOneOrFail({
        where: { id: orcamentoId },
      });

      // Atualizar as propriedades da transacao com base no DTO
      orcamento.limite = updateOrcamentoDto.limite;
      orcamento.data = updateOrcamentoDto.data;
      // ...

      // Salvar as alterações no banco de dados
      return await this.orcamentosRepository.save(orcamento);
    } catch (error) {
      throw new NotFoundException(
        `Transação com ID ${orcamentoId} não encontrada.`,
      );
    }
  }

  async destroy(orcamentoId: number): Promise<void> {
    try {
      const orcamento = await this.orcamentosRepository.findOneOrFail({
        where: { id: orcamentoId },
      });
      await this.orcamentosRepository.remove(orcamento);
    } catch (error) {
      throw new NotFoundException(
        `Transação com ID ${orcamentoId} não encontrada.`,
      );
    }
  }
}