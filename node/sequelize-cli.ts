// // sequelize-cli.ts
// import 'ts-node/register'; // This will tell Node to use ts-node to compile TypeScript files
// import { Sequelize } from 'sequelize-typescript'; // if you're using sequelize-typescript (optional)

// // Load the sequelize CLI
// require('sequelize-cli/bin/sequelize');

require('ts-node/register');
module.exports = require('sequelize-cli/lib/cli');