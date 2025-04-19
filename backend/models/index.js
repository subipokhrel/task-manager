const { Sequelize } = require('sequelize'); //Brings in the Sequelize library to help interact with the MySQL database.
require('dotenv').config(); //Loads variables from .env file into process.env.

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: 'mysql',
  }
); //Sequelize initializes a connection to MySQL DB using credentials from .env.

sequelize.authenticate() //Verifying the connection
  .then(() => console.log('DB connected successfully!'))
  .catch(err => console.error('DB connection failed:', err));

module.exports = sequelize; //imports sequelize in your other files like models or index.js server.