import { Op } from 'sequelize';
import {
    AutoIncrement,
    BeforeValidate,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Scopes,
    Table,
} from 'sequelize-typescript';
import { Company } from 'src/companies/entities/company.entity';
import { InvoiceLine } from 'src/entities/invoiceLine.entity';
import { Required, RequiredIf, RequiredWithout } from 'src/helpers/validators';
import { Individual } from 'src/individuals/entities/individual.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { Line } from 'src/lines/entities/line.entity';

//@TODO: change the field names to reflect individual invoices

@Scopes(() => ({
    paid: {
        where: {
            isPaid: true,
        },
    },
    jobInvoices: {
        where: {
            job_id: {
                [Op.not]: null,
            },
        },
    },
    notJobInvoices: {
        where: {
            job_id: {
                [Op.is]: null,
            },
        },
    },
    company: {
        include: [Company, Job],
    },
    individual: {
        include: [Individual],
    },
    client: {
        include: [Company, Individual, Job],
    },
}))
@Table
export class Invoice extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @BeforeValidate
    static setLabelAttribute(instance: Invoice) {
        let count;
        const currentYear = new Date().getFullYear();
        if (instance.job_id !== undefined) {
            return Invoice.scope('jobInvoices')
                .count()
                .then((result) => {
                    count = result + 1;
                    count = count.toString().padStart(6, '0');
                    instance.label = `FA-${currentYear}-${count}`;
                });
        } else {
            return Invoice.scope('notJobInvoices')
                .count()
                .then((result) => {
                    count = result + 1;
                    count = count.toString().padStart(6, '0');
                    instance.label = `FB-${currentYear}-${count}`;
                });
        }
    }

    @Required()
    @Column({
        type: DataType.STRING,
    })
    label: string;

    @RequiredIf('job_id')
    @Column({
        type: DataType.DECIMAL(3, 1),
    })
    worked_days: number;

    @Required()
    @Column({
        type: DataType.ENUM('job', 'client'),
    })
    type: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    isPaid: boolean;

    @RequiredIf('worked_days')
    @ForeignKey(() => Job)
    @Column({
        type: DataType.INTEGER,
    })
    job_id: number;

    @BelongsTo(() => Job)
    job: Job;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.BIGINT,
    })
    company_id: number;
    @BelongsTo(() => Company)
    company: Company;

    @RequiredWithout(['job_id', 'company_id'])
    @ForeignKey(() => Individual)
    @Column({
        type: DataType.INTEGER,
    })
    individual_id: number;
    @BelongsTo(() => Individual)
    individual: Individual;

    @BelongsToMany(() => Line, () => InvoiceLine)
    lines: Line[];
}
