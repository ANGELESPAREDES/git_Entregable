const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  enfermedad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doctores: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'items', // puedes cambiar el nombre de la tabla si lo deseas
  timestamps: true    // si no quieres createdAt/updatedAt, pon `timestamps: false`
});

module.exports = Item;
