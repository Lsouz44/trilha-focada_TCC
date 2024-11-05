const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

class Goal extends Model {}

Goal.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // por exemplo: "pendente", "concluído"
  },
}, {
  sequelize,
  modelName: 'Goal',
});

// Definindo a relação
Goal.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = Goal;
