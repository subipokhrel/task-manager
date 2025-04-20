const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.ENUM('Not Started', 'In Progress', 'Done', 'Deferred'),
    allowNull: false,
    defaultValue: 'Not Started',
  },
});

User.hasMany(Task, { foreignKey: 'userId', onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
