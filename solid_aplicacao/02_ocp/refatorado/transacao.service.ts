import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransacaoDto } from './dto/create-transacoes.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { Transacao } from './entities/transacao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Between, EntityManager, Repository } from 'typeorm';

// Interface para o tipo de transação
interface TipoTransacao {
  calcularTotal(transacoes: Transacao[]): number;
}

// Implementação padrão para transações de saída
class TransacaoSaida implements TipoTransacao {
  calcularTotal(transacoes: Transacao[]): number {
    return transacoes.reduce((total, transacao) => {
      if (transacao.tipo === 'saida') {
        return total - transacao.valor;
      }
      return total;
    }, 0);
  }
}

// Implementação padrão para transações de entrada
class TransacaoEntrada implements TipoTransacao {
  calcularTotal(transacoes: Transacao[]): number {
    return transacoes.reduce((total, transacao) => {
      if (transacao.tipo === 'entrada') {
        return total + transacao.valor;
      }
      return total;
    }, 0);
  }
}

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(
    usuarioId: number,
    createTransacaoDto: CreateTransacaoDto,
  ): Promise<Transacao> {
    const { nome, descricao, valor, data, tipo, categoriaID } = createTransacaoDto;

    // Verificar se a categoria existe
    const categoria = await this.categoriaRepository.findOne({
      where: { id: categoriaID },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${categoriaID} não encontrada.`);
    }

    // Criar a transação e associar a categoria
    const transacao = this.transacaoRepository.create({
      nome,
      descricao,
      valor,
      data,
      tipo,
      usuario: { id: usuarioId },
      categoria,
    });
    
    // Salvar a transação
    return this.transacaoRepository.save(transacao);
  }

  async findAll(usuarioId: number): Promise<Transacao[]> {
    return this.transacaoRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['usuario', 'categoria'],
    });
  }

  async destroy(transacaoId: number): Promise<void> {
    try {
      const transacao = await this.transacaoRepository.findOneOrFail({
        where: { id: transacaoId },
      });
      await this.transacaoRepository.remove(transacao);
    } catch (error) {
      throw new NotFoundException(`Transação com ID ${transacaoId} não encontrada.`);
    }
  }

  async update(transacaoId: number, updateTransacaoDto: UpdateTransacaoDto): Promise<Transacao> {
    try {
      const transacao = await this.transacaoRepository.findOneOrFail({
        where: { id: transacaoId },
      });

      // Atualizar as propriedades da transacao com base no DTO
      transacao.descricao = updateTransacaoDto.descricao;
      // ...

      // Salvar as alterações no banco de dados
      return await this.transacaoRepository.save(transacao);
    } catch (error) {
      throw new NotFoundException(`Transação com ID ${transacaoId} não encontrada.`);
    }
  }

  private async obterTransacoesPorTipo(usuarioId: number, tipo: string): Promise<Transacao[]> {
    return this.transacaoRepository.find({
      where: {
        usuario: { id: usuarioId },
        tipo: tipo,
      },
      relations: ['usuario', 'categoria'],
    });
  }

  async calcularGastosSaidaMesAtual(userId: number): Promise<number> {
    const dataAtual = new Date();
    const primeiroDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    const ultimoDiaMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);

    // Consultar transações do tipo saída dentro do mês atual
    const transacoesSaidaMesAtual = await this.obterTransacoesPorTipo(userId, 'saida');
    
    // Utilizar a estratégia para calcular o total
    const transacaoSaida = new TransacaoSaida();
    const totalGastosSaida = transacaoSaida.calcularTotal(transacoesSaidaMesAtual);

    return totalGastosSaida;
  }
  async obterSomaValoresPorCategoria(usuarioId: number): Promise<any[]> {
    const somaPorCategoria = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .select('categoria.nome as categoria')
      .addSelect('SUM(transacao.valor) as soma')
      .leftJoin('transacao.categoria', 'categoria') // Adicione esta linha para incluir a relação
      .where('transacao.usuarioId = :usuarioId', { usuarioId })
      .groupBy('categoria.nome')
      .getRawMany();

    return somaPorCategoria;
  }

  async calcularSomaValoresEntradaPorCategoria(usuarioId: number): Promise<any[]> {
    return this.transacaoRepository
      .createQueryBuilder('transacao')
      .select([
        'categoria.nome AS categoria',
        'SUM(transacao.valor) AS soma',
      ])
      .innerJoin('transacao.categoria', 'categoria')
      .where('transacao.tipo = :tipo', { tipo: 'entrada' })
      .andWhere('transacao.usuario = :usuarioId', { usuarioId })
      .groupBy('categoria.nome')
      .getRawMany();
  }

  async calcularSomaValoresSaidaPorCategoria(usuarioId: number): Promise<any[]> {
    return this.transacaoRepository
      .createQueryBuilder('transacao')
      .select(['categoria.nome AS categoria', 'SUM(transacao.valor) AS soma'])
      .innerJoin('transacao.categoria', 'categoria')
      .where('transacao.tipo = :tipo', { tipo: 'saida' })
      .andWhere('transacao.usuario = :usuarioId', { usuarioId })
      .groupBy('categoria.nome')
      .getRawMany();
  }

  async calcularSomaTotalValores(usuarioId: number): Promise<number> {
    const resultado = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .select('SUM(transacao.valor) AS somaTotal')
      .where('transacao.usuario = :usuarioId', { usuarioId })
      .getRawOne();

    return resultado ? parseFloat(resultado.somaTotal) : 0;
  }

  async calcularSomaTotalValoresSaida(usuarioId: number): Promise<number> {
    const resultado = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .select('SUM(transacao.valor) AS somaTotalSaida')
      .where('transacao.usuario = :usuarioId', { usuarioId })
      .andWhere('transacao.tipo = :tipo', { tipo: 'saida' })
      .getRawOne();

    return resultado ? parseFloat(resultado.somaTotalSaida) : 0;
  }

  async calcularSomaTotalValoresEntrada(usuarioId: number): Promise<number> {
    const resultado = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .select('SUM(transacao.valor) AS somaTotalSaida')
      .where('transacao.usuario = :usuarioId', { usuarioId })
      .andWhere('transacao.tipo = :tipo', { tipo: 'entrada' })
      .getRawOne();

    return resultado ? parseFloat(resultado.somaTotalSaida) : 0;
  }

  async obterTransacaoPorId(transacaoId: number): Promise<Transacao> {
    const transacao = await this.transacaoRepository.findOne({
      where: { id: transacaoId },
    });

    if (!transacao) {
      throw new NotFoundException('Transação não encontrada');
    }

    return transacao;
  }
}