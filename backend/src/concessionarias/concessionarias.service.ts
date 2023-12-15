import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concessionaria } from './entities/concessionaria.entity';

@Injectable()
export class ConcessionariasService {
  constructor(
    @InjectRepository(Concessionaria)
    private readonly concessionariaRepository: Repository<Concessionaria>,
  ) {}

  async findAll(): Promise<Concessionaria[]> {
    return this.concessionariaRepository.find({ relations: ['veiculos'] });
  }

  async findOne(id: number): Promise<Concessionaria> {
    const concessionaria = await this.concessionariaRepository
      .createQueryBuilder('concessionaria')
      .leftJoinAndSelect('concessionaria.veiculos', 'veiculo')
      .where('concessionaria.id = :id', { id })
      .getOne();

    if (!concessionaria) {
      throw new NotFoundException(`Concessionaria com ID ${id} não encontrada`);
    }

    return concessionaria;
  }

  async create(concessionariaData: Partial<Concessionaria>): Promise<Concessionaria> {
    const concessionaria = this.concessionariaRepository.create(concessionariaData);
    return this.concessionariaRepository.save(concessionaria);
  }

  async update(id: number, concessionariaData: Partial<Concessionaria>): Promise<Concessionaria> {
    await this.findOne(id); // Garante que a concessionaria existe
    await this.concessionariaRepository.update(id, concessionariaData);
    return this.findOne(id); // Retorna a concessionaria atualizada
  }

  async remove(id: number): Promise<void> {
    const concessionaria = await this.findOne(id); // Garante que a concessionaria existe
    await this.concessionariaRepository.remove(concessionaria);
  }
}
