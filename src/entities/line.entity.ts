import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table
export class Line extends Model {
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
    unit_price: number;
    
}
