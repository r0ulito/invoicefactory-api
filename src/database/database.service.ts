import { Sequelize } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';
import Models from '../entities';

const sequelize = new Sequelize('invoicefactory', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

@Injectable()
export class databaseService {
    constructor() {
        try {
            sequelize
                .authenticate()
                .then(() =>
                    console.log(
                        'Connection has been established successfully.',
                    ),
                );
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        sequelize.addModels([...Models]);
    }
}
