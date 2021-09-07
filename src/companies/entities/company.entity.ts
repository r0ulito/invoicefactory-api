import { All } from '@nestjs/common';
import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Default,
    HasMany,
    AllowNull,
} from 'sequelize-typescript';
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
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    address: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    zip_code: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    city: string;

    @AllowNull(false)
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
