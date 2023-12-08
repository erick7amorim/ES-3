import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Transacao } from 'src/transacao/entities/transacao.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(
    usuarioId: number,
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<Categoria> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });

    const novaCategoria = this.categoriaRepository.create(createCategoriaDto);
    novaCategoria.usuario = usuario;

    return this.categoriaRepository.save(novaCategoria);
  }

  async findAll(usuarioId: number): Promise<Categoria[]> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
      relations: ['categorias'],
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com ID ${usuarioId} não encontrado.`,
      );
    }

    return usuario.categorias;
  }
}