import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Default,
} from 'sequelize-typescript';

@Table
export class Company extends Model {
    //@TODO: implement reversed relation
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: DataType.STRING,
    })
    name: string;

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
    get country(): string {
        return `${this.getDataValue(
            'country',
        )[0].toUpperCase()}${this.getDataValue('country').substr(1)}`;
    }
}
