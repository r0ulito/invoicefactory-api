import {
    AutoIncrement,
    Column,
    DataType,
    Default,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Required } from 'src/helpers/validators';
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Table
export class Individual extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: DataType.ENUM('male', 'female'),
    })
    gender: string;

    @Required()
    @Column({
        type: DataType.STRING,
    })
    first_name: string;

    @Required()
    @Column({
        type: DataType.STRING,
    })
    last_name: string;

    @Required()
    @Column({
        type: DataType.STRING,
    })
    address: string;

    @Required()
    @Column({
        type: DataType.STRING,
    })
    zip_code: string;

    @Required()
    @Column({
        type: DataType.STRING,
    })
    city: string;

    @Required()
    @Default('france')
    @Column({
        type: DataType.STRING,
    })
    public get country(): string {
        return `${this.getDataValue(
            'country',
        )[0].toUpperCase()}${this.getDataValue('country').substr(1)}`;
    }

    public set country(value: string) {
        this.setDataValue('country', value.toLowerCase());
    }

    @HasMany(() => Invoice)
    invoices: Invoice[];
}
