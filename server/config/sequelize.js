const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bd_trilhafocada', 'leandro', 'tcc', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;