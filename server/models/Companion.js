const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

class Companion extends Model {}

Companion.init({
  relationType: {
    type: DataTypes.STRING, // Por exemplo: "amigo", "mentor", etc.
  },
}, {
  sequelize,
  modelName: 'Companion',
});

// Definindo a relação
Companion.belongsTo(User, {
  foreignKey: 'userId', // O acompanhante é um usuário
  onDelete: 'CASCADE',
});

module.exports = Companion;