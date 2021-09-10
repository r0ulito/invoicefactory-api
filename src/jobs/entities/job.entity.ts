import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
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

    @Required()
    @Column({
        type: DataType.STRING,
    })
    label: string;

    @Required()
    @Column({
        type: DataType.DECIMAL(6, 2),
    })
    daily_rate: number;

    @Required()
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
