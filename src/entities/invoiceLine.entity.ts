import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Line } from 'src/lines/entities/line.entity';

@Table
export class InvoiceLine extends Model {
    @ForeignKey(() => Invoice)
    invoice_id: number;

    @ForeignKey(() => Line)
    line_id: number;
}
