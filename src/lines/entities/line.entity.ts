import {
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { InvoiceLine } from 'src/entities/invoiceLine.entity';
import { Required } from 'src/helpers/validators';
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Table
export class Line extends Model {
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
    unit_price: number;

    @BelongsToMany(() => Invoice, () => InvoiceLine)
    invoices: Invoice[];
}
