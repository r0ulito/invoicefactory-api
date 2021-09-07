import {
    AllowNull,
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

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    first_name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    last_name: string;

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
}
