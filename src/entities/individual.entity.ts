import {
    AutoIncrement,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

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

    @Column({
        type: DataType.STRING,
    })
    first_name: string;

    @Column({
        type: DataType.STRING,
    })
    last_name: string;

    @Column({
        type: DataType.STRING,
    })
    address: string;

    @Column({
        type: DataType.STRING,
    })
    zip_code: string;

    @Column({
        type: DataType.STRING,
    })
    city: string;

    @Default('france')
    @Column({
        type: DataType.STRING,
    })
    country: string;
}
