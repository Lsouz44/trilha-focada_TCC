const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

class Activity extends Model {}

Activity.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'Activity',
});

// Definindo a relação
Activity.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = Activity;
