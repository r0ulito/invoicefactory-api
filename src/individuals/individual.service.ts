import { Injectable } from '@nestjs/common';
import { CreateIndividualDto } from './dto/create-individual.dto';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { Individual } from './entities/individual.entity';

@Injectable()
export class IndividualService {
    create(createIndividualDto: CreateIndividualDto) {
        return Individual.create(createIndividualDto)
            .then((response) => response)
            .catch((error) => error);
    }

    findAll() {
        return Individual.findAll()
            .then((response) => response)
            .catch((error) => error);
        return `This action returns all individual`;
    }

    findOne(id: number) {
        return Individual.findAll({
            where: {
                id,
            },
        })
            .then((response) => response)
            .catch((error) => error);
        return `This action returns a #${id} individual`;
    }

    update(id: number, updateIndividualDto: UpdateIndividualDto) {
        return Individual.update(updateIndividualDto, {
            where: {
                id,
            },
        })
            .then((response) => response)
            .catch((error) => error);
        return `This action updates a #${id} individual`;
    }

    remove(id: number) {
        return Individual.destroy({
            where: {
                id,
            },
        });
        return `This action removes a #${id} individual`;
    }
}
