import { Sequelize } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';
import Models from '../entities';
import { Company } from 'src/companies/entities/company.entity';
import { validate } from 'class-validator';
import { Job } from 'src/jobs/entities/job.entity';

const sequelize = new Sequelize('invoicefactory', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // models: [...Models],
});

@Injectable()
export class databaseService {
    constructor() {
        try {
            sequelize.addModels([...Models]);
            sequelize.authenticate().then(() => {
                console.log('Connection has been established successfully.');
                sequelize
                    .sync({ force: true })
                    .then(() => {
                        Company.create({
                            name: 'Twitch',
                            address: '24 avenue du boulevard',
                            zip_code: '78000',
                            city: 'versailles',
                        });
                        Job.create({
                            label: 'Ma super mission',
                            daily_rate: 300,
                            company_id: 1,
                        })
                            .then(console.log)
                            .catch(console.log);
                    })
                    .catch((error) => console.log(error));
            });
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
