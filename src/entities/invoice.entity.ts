import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    ForeignKey,
    Default,
    AllowNull,
} from 'sequelize-typescript';
import { Company } from './company.entity';
import { Individual } from './individual.entity';
import { Job } from './job.entity';

@Table
export class Invoice extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: DataType.STRING,
    })
    label: string;

    @Column({
        type: DataType.DECIMAL(3, 1),
    })
    worked_days: number;

    @Column({
        type: DataType.ENUM('job', 'client'),
    })
    type: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    isPaid: boolean;

    @AllowNull
    @ForeignKey(() => Job)
    @Column({
        type: DataType.NUMBER,
    })
    job_id: number;

    @AllowNull
    @ForeignKey(() => Company)
    @Column({
        type: DataType.NUMBER,
    })
    company_id: number;

    @AllowNull
    @ForeignKey(() => Individual)
    @Column({
        type: DataType.NUMBER,
    })
    individual_id: number;
}
