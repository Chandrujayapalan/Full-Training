// interface Secret {
//     key: string;
//   }

// src/config/config.ts
// import { SequelizeOptions } from 'sequelize-typescript';

// const config: SequelizeOptions = {
//     database: "postgres",
//     username: "postgres", 
//     password: "12345",
//     host : "localhost",
//     port : 5432, // Or whatever dialect you're using
// };

// export default config;

// type Secret = string;


// export const SECRET_KEY: Secret = 'your-secret-key-here';



import { Dialect } from 'sequelize';

export default {
  development: {
    database: "postgres",
    username: "postgres", 
    password: "12345",
    host : "localhost",
    port : 5432, // Or whatever dialect you're using
    dialect: 'postgres' as Dialect,  // or 'mysql', 'sqlite', etc.
  },
  test: {
    username: 'yourUsername',
    password: 'yourPassword',
    database: 'yourTestDatabase',
    host: 'localhost',
    dialect: 'postgres' as Dialect,
  },
  production: {
    username: 'yourUsername',
    password: 'yourPassword',
    database: 'yourDatabase',
    host: 'localhost',
    dialect: 'postgres' as Dialect,
  },
};
