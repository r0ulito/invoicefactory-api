import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { Job } from 'src/jobs/entities/job.entity';
import { Line } from 'src/lines/entities/line.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
    create(createInvoiceDto: CreateInvoiceDto) {
        const invoice = Invoice.build(createInvoiceDto);
        return validateOrReject(invoice, {
            validationError: { target: false },
        })
            .then(() => invoice.save().then((response) => response))
            .catch((errors) => errors);
    }

    findAll() {
        return Invoice.findAll()
            .then((response) => response)
            .catch((error) => error);
    }

    findOne(id: number) {
        return Invoice.findByPk(id)
            .then((response) => response)
            .catch((error) => error);
    }

    update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
        const invoice = Invoice.build(updateInvoiceDto);
        return validateOrReject(invoice, {
            validationError: { target: false },
        })
            .then(() =>
                Invoice.update(updateInvoiceDto, {
                    where: { id },
                }).then((response) => response),
            )
            .catch((errors) => errors);
    }

    remove(id: number) {
        return Invoice.destroy({
            where: { id },
        })
            .then((response) => response)
            .catch((error) => error);
    }

    jobs(id: number) {
        return Invoice.findByPk(id, {
            include: Job,
        })
            .then((response) => response)
            .catch((error) => error);
    }

    lines(id: number) {
        return Invoice.findByPk(id, {
            include: Line,
        })
            .then((response) => response)
            .catch((error) => error);
    }
}
