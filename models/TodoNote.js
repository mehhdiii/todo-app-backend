const {DataTypes} = require('sequelize'); 
const sequelize = require('../database')


const TodoNote = sequelize.define(
    'TodoNote', 
    {
        title: {
            type: DataTypes.STRING, 
            allowNull: true
        }, 
        description: {
            type: DataTypes.STRING, 
            allowNull: true
        }, 
        isCompleted: {
            type: DataTypes.BOOLEAN, 
            allowNull: false
        }
    }
);
module.exports = TodoNote; 