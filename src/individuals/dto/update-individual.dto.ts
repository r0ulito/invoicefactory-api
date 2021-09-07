import { PartialType } from '@nestjs/mapped-types';
import { CreateIndividualDto } from './create-individual.dto';

export class UpdateIndividualDto extends PartialType(CreateIndividualDto) {}
