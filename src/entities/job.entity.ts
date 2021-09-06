import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import { Company } from './company.entity';

@Table
export class Job extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: DataType.STRING,
    })
    label: string;

    @Column({
        type: DataType.DECIMAL(6, 2),
    })
    daily_rate: number;

    @ForeignKey(() => Company)
    @Column
    company_id: number;
}
