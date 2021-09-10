import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { Line } from './entities/line.entity';

@Injectable()
export class LineService {
    create(createLineDto: CreateLineDto) {
        const line = Line.build(createLineDto);
        return validateOrReject(line, {
            validationError: { target: false },
        })
            .then(() => line.save().then((response) => response))
            .catch((errors) => errors);
    }

    findAll() {
        return Line.findAll()
            .then((response) => response)
            .catch((error) => error);
    }

    findOne(id: number) {
        return Line.findByPk(id)
            .then((response) => response)
            .catch((error) => error);
    }

    update(id: number, updateLineDto: UpdateLineDto) {
        const line = Line.build(updateLineDto);
        return validateOrReject(line, {
            validationError: { target: false },
        })
            .then(() =>
                Line.update(updateLineDto, {
                    where: { id },
                }),
            )
            .catch((errors) => errors);
    }

    remove(id: number) {
        return Line.destroy({
            where: { id },
        })
            .then((response) => response)
            .catch((error) => error);
    }
}
