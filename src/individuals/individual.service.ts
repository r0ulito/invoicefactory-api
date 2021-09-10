import { Injectable } from '@nestjs/common';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { CreateIndividualDto } from './dto/create-individual.dto';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { Individual } from './entities/individual.entity';
import { validateOrReject } from 'class-validator';

@Injectable()
export class IndividualService {
    create(createIndividualDto: CreateIndividualDto) {
        const individual = Individual.build(createIndividualDto);
        return validateOrReject(individual, {
            validationError: { target: false },
        })
            .then(() => individual.save())
            .catch((errors) => errors);
    }

    findAll() {
        return Individual.findAll()
            .then((response) => response)
            .catch((error) => error);
    }

    findOne(id: number) {
        return Individual.findByPk(id)
            .then((response) => response)
            .catch((error) => error);
    }

    update(id: number, updateIndividualDto: UpdateIndividualDto) {
        const individual = Individual.build(updateIndividualDto);
        return validateOrReject(individual, {
            validationError: { target: false },
        })
            .then(() =>
                Individual.update(updateIndividualDto, { where: { id } }),
            )
            .catch((errors) => errors);
    }

    remove(id: number) {
        return Individual.destroy({
            where: { id },
        });
    }

    invoices(id: number) {
        return Individual.findByPk(id, {
            include: Invoice,
        });
    }
}
