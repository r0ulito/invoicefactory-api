import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    ForeignKey,
    BelongsTo,
    AllowNull,
    HasMany,
} from 'sequelize-typescript';
import { Required } from 'src/helpers/validators';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Company } from '../../companies/entities/company.entity';

@Table
export class Job extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Required('label')
    @Column({
        type: DataType.STRING,
    })
    label: string;

    @Required('daily_rate')
    @Column({
        type: DataType.DECIMAL(6, 2),
    })
    daily_rate: number;

    @Required('company_id')
    @ForeignKey(() => Company)
    @Column({
        type: DataType.BIGINT,
    })
    company_id: number;

    @BelongsTo(() => Company)
    company: Company;

    @HasMany(() => Invoice)
    invoices: Invoice[];
}
