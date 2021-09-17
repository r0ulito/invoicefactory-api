import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { Company } from 'src/companies/entities/company.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
    create(createJobDto: CreateJobDto) {
        const job = Job.build(createJobDto);
        return validateOrReject(job, {
            validationError: { target: false },
        })
            .then(() => job.save().then((response) => response))
            .catch((errors) => errors);
    }

    findAll() {
        return Job.findAll()
            .then((response) => response)
            .catch((error) => error);
    }

    findOne(id: number) {
        return Job.findByPk(id)
            .then((response) => response)
            .catch((error) => error);
    }

    update(id: number, updateJobDto: UpdateJobDto) {
        const job = Job.build(updateJobDto);
        return validateOrReject(job, {
            validationError: { target: false },
        })
            .then(() =>
                Job.update(updateJobDto, {
                    where: { id },
                }).then((response) => response),
            )
            .catch((errors) => errors);
    }

    remove(id: number) {
        return Job.destroy({
            where: { id },
        })
            .then((response) => response)
            .catch((error) => error);
    }

    invoices(id: number) {
        return Job.findByPk(id, {
            include: Invoice,
        })
            .then((response) => response)
            .catch((error) => error);
    }

    client(id: number) {
        return Job.findByPk(id, {
            include: Company,
        })
            .then((response) => response)
            .catch((error) => error);
    }
}
