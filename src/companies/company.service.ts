import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
    create(createCompanyDto: CreateCompanyDto) {
        Company.create(createCompanyDto)
            .then((response) => response)
            .catch((error) => error);
    }

    findAll() {
        return Company.findAll();
    }

    findOne(id: number) {
        return Company.findAll({
            where: {
                id: id,
            },
        });
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        Company.update(updateCompanyDto, {
            where: {
                id: id,
            },
        });
    }

    remove(id: number) {
        Company.destroy({
            where: {
                id,
            },
        });
    }
}
