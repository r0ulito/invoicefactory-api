import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Default,
    HasMany,
} from 'sequelize-typescript';
import { Required } from 'src/helpers/validators';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { Job } from '../../jobs/entities/job.entity';

@Table
export class Company extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
    })
    id: number;

    @Required()
    @Column({
        type: DataType.STRING,
    })
    name: string;

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
    get city(): string {
        return `${this.getDataValue(
            'city',
        )[0].toUpperCase()}${this.getDataValue('city').substr(1)}`;
    }
    set city(value: string) {
        this.setDataValue('city', value.toLowerCase());
    }

    @Required()
    @Default('france')
    @Column({
        type: DataType.STRING,
    })
    get country(): string {
        return `${this.getDataValue(
            'country',
        )[0].toUpperCase()}${this.getDataValue('country').substr(1)}`;
    }
    set country(value: string) {
        this.setDataValue('country', value.toLowerCase());
    }

    @HasMany(() => Job)
    jobs: Job[];

    @HasMany(() => Invoice)
    invoices: Invoice[];
}
