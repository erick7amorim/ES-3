import { PartialType } from '@nestjs/mapped-types';
import { CreateConcessionariaDto } from './create-concessionaria.dto';

export class UpdateConcessionariaDto extends PartialType(CreateConcessionariaDto) {}
