// Loads the env variables
require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("Database URL:", process.env.DATABASE_URL);
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialect: "postgres",
    logging: console.log(),
});

module.exports = { sequelize };
