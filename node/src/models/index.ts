import 'ts-node/register';
import { Sequelize } from 'sequelize-typescript';
import { Dialect, DataTypes } from 'sequelize';
import config from '../config/config';
import fs from 'fs';
import path from 'path';
// require('sequelize-cli/bin/sequelize');
const basename = path.basename(__filename);
const dbName = config.development.database as string
const dbUser = config.development.username as string
const dbHost = config.development.host as string
const dbDriver = "postgres" as Dialect
const dbPassword: string = config.development.password as string
const db: any = {};
let sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver
})
const fileRes = fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
});
(async () => {
    for (let i = 0; i < fileRes.length; i++) {
        const file = fileRes[i]
        const model = await import(path.join(__dirname, file)); // Dynamically import model
        const modelInstance = model.default(sequelize, DataTypes); // Assuming the model exports a default function
        db[modelInstance.name] = modelInstance; // Store the model instance
    }
    Object.keys(db).forEach(modelName => {
        console.log('modelName', modelName);
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
})();
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// (async () => {
//     await db.sequelize.authenticate().then(async () => {
//         await db.sequelize.sync({}).catch((err: any) => {
//             console.error('ERROR - Unable to sync', err)
//         })
//         console.info('Database is connected.')
      
//     }).catch((err: any) => {
//         console.error('ERROR - Unable to connect to the database:', err)
//     })
// })();

export default db



