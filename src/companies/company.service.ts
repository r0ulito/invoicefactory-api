import { Injectable } from '@nestjs/common';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class CompanyService {
    create(createCompanyDto: CreateCompanyDto) {
        const company = Company.build(createCompanyDto);
        return validateOrReject(company, {
            validationError: { target: false },
        })
            .then(() => company.save())
            .catch((errors) => errors);
    }

    findAll() {
        return Company.findAll()
            .then((response) => response)
            .catch((error) => error);
    }

    findOne(id: number) {
        return Company.findByPk(id)
            .then((response) => response)
            .catch((error) => error);
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        const company = Company.build(updateCompanyDto);
        return validateOrReject(company, {
            validationError: { target: false },
        })
            .then(() =>
                Company.update(updateCompanyDto, {
                    where: { id },
                }).then((response) => response),
            )
            .catch((error) => error);
    }

    remove(id: number) {
        return Company.destroy({
            where: { id },
        })
            .then((response) => response)
            .catch((error) => error);
    }

    invoices(id: number) {
        return Company.findByPk(id, {
            include: Invoice,
        })
            .then((response) => response)
            .catch((error) => error);
    }
}
