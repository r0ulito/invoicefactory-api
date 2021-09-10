import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    ForeignKey,
    Default,
    BelongsTo,
    BelongsToMany,
    Scopes,
    BeforeCreate,
    BeforeSave,
    AfterCreate,
    AfterSave,
    AllowNull,
    BeforeValidate,
} from 'sequelize-typescript';
import { InvoiceLine } from 'src/entities/invoiceLine.entity';
import { Line } from 'src/lines/entities/line.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Individual } from 'src/individuals/entities/individual.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { Required, RequiredIf } from 'src/helpers/validators';
import { Op } from 'sequelize';

// si job_id est set alors label est égal à FA-${currentYear}-${jobInvoiceCount.padstart(6, '0')}
// E.G => FA-2021-000019 pour la 19ème facture de mission de l'année
// sinon label est égal à FB-${currentYear}-${notCompanyInvoiceCount.padstart(6, '0')}
// E.G => FB-2021-000006

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
}))
@Table({
    validate: {
        allowNullCompanyIdAndJobIdIfIndividualIdIsNotNull(this: Invoice) {
            if (
                this.getDataValue('individual_id') !== undefined &&
                (this.getDataValue('job_id') !== undefined ||
                    this.getDataValue('company_id') !== undefined)
            ) {
                throw new Error(
                    'Require neither both job and company when individual type is set',
                );
            }
        },
        disallowNullCompanyIdIfJobIdIsNotNull(this: Invoice) {
            if (
                this.getDataValue('job_id') !== undefined &&
                this.getDataValue('company_id') === undefined
            ) {
                throw new Error('Company must be chosen if a job is selected');
            }
        },
    },
})
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

    @Required('label')
    @Column({
        type: DataType.STRING,
    })
    label: string;

    @RequiredIf('job_id')
    @Column({
        type: DataType.DECIMAL(3, 1),
    })
    worked_days: number;

    @Required('type')
    @Column({
        type: DataType.ENUM('job', 'client'),
    })
    type: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    isPaid: boolean;

    /**
     *
     *  Is validated through allowNullCompanyIdAndJobIdIfIndividualIdIsNotNull && disallowNullCompanyIdIfJobIdIsNotNull
     *
     **/

    @ForeignKey(() => Job)
    @Column({
        type: DataType.INTEGER,
    })
    get job_id(): string {
        return this.getDataValue('job_id');
    }

    set job_id(v: string) {
        this.setDataValue('job_id', v);
    }

    @BelongsTo(() => Job)
    job: Job;

    /**
     *
     *  Is validated through allowNullCompanyIdAndJobIdIfIndividualIdIsNotNull && disallowNullCompanyIdIfJobIdIsNotNull
     *
     **/

    @ForeignKey(() => Company)
    @Column({
        type: DataType.BIGINT,
    })
    company_id: number;
    @BelongsTo(() => Company)
    company: Company;

    /**
     *
     *  Is validated through allowNullCompanyIdAndJobIdIfIndividualIdIsNotNull && disallowNullCompanyIdIfJobIdIsNotNull
     *
     **/
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
